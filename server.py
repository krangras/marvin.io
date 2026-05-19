import http.server
import logging
import sys
import os
import signal

logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

class LoggingHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        logging.info("%s - %s", self.client_address[0], format % args)

    def do_GET(self):
        try:
            super().do_GET()
        except BrokenPipeError:
            pass
        except ConnectionResetError:
            pass
        except Exception as e:
            logging.error("Error handling %s: %s", self.path, e)

    def do_HEAD(self):
        try:
            super().do_HEAD()
        except BrokenPipeError:
            pass
        except ConnectionResetError:
            pass
        except Exception as e:
            logging.error("Error handling %s: %s", self.path, e)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 80))
    bind = os.environ.get("BIND", "0.0.0.0")
    directory = os.environ.get("DIR", "/app")

    os.chdir(directory)

    server = http.server.ThreadingHTTPServer((bind, port), LoggingHandler)
    server.allow_reuse_address = True

    def shutdown(sig, frame):
        logging.info("Shutting down...")
        server.shutdown()
        sys.exit(0)

    signal.signal(signal.SIGTERM, shutdown)
    signal.signal(signal.SIGINT, shutdown)

    logging.info("Starting server on %s:%s, serving %s", bind, port, directory)
    sys.stdout.flush()
    server.serve_forever()
