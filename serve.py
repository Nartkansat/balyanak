import http.server
import os
import re
import socketserver
import sys

PORT = 5173

class RangeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Simple HTTP Request Handler with Byte-Range Support for smooth video streaming."""

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def send_head(self):
        if 'Range' not in self.headers:
            self.range = None
            return super().send_head()

        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            return super().send_head()

        file_size = os.path.getsize(path)
        range_header = self.headers.get('Range', '').strip()
        range_match = re.match(r'bytes=(\d+)-(\d*)', range_header)

        if not range_match:
            return super().send_head()

        start = int(range_match.group(1))
        end = int(range_match.group(2)) if range_match.group(2) else file_size - 1

        if start >= file_size or end >= file_size or start > end:
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{file_size}')
            self.end_headers()
            return None

        self.send_response(206)
        ctype = self.guess_type(path)
        self.send_header('Content-type', ctype)
        self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.send_header('Last-Modified', self.date_time_string(os.path.getmtime(path)))
        self.end_headers()

        f = open(path, 'rb')
        f.seek(start)
        return _RangeFile(f, end - start + 1)


class _RangeFile:
    def __init__(self, f, length):
        self.f = f
        self.length = length
        self.bytes_read = 0

    def read(self, size=-1):
        if self.bytes_read >= self.length:
            return b''
        if size < 0 or size > (self.length - self.bytes_read):
            size = self.length - self.bytes_read
        data = self.f.read(size)
        self.bytes_read += len(data)
        return data

    def close(self):
        self.f.close()


class ThreadingRangeServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True

def run():
    with ThreadingRangeServer(("", PORT), RangeHTTPRequestHandler) as httpd:
        print(f"Threading Server with Range support running at http://localhost:{PORT}/", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass

if __name__ == '__main__':
    run()
