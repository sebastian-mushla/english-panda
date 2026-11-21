# Локальный сервер без кэша: правки в файлах видны сразу после обновления страницы.
# Запуск: python3 serve.py [порт]
import http.server
import os
import sys


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


os.chdir(os.path.dirname(os.path.abspath(__file__)))
port = int(sys.argv[1]) if len(sys.argv) > 1 else 5188
http.server.ThreadingHTTPServer(('', port), NoCache).serve_forever()
