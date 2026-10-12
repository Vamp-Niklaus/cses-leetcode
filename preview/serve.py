"""Development-only static preview; not part of the extension runtime."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path in ("/", "/login") or path.startswith("/problemset/"):
            self.path = "/preview/workspace.html"
        super().do_GET()


ThreadingHTTPServer(("0.0.0.0", 8080), PreviewHandler).serve_forever()