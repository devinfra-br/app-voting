import unittest

from app import app


class TestApp(unittest.TestCase):

    def test_hello_endpoint(self):
        # Sending a GET request to the / endpoint
        response = app.test_client().get('/')
        # Asserting the status code and response data
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<!doctype html>', response.data)
                
if __name__ == '__main__':
    unittest.main()
