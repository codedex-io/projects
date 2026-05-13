import socket
import threading
from queue import Queue

# Define the number of threads to use for scanning
NUM_THREADS = 100

# Create a queue to hold the ports to be scanned
port_queue = Queue()

# Function to scan a single port
def scan_port(ip, port):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(1)  # Set a timeout for the connection attempt
            result = s.connect_ex((ip, port))  # Try to connect to the port
            if result == 0:
                print(f"Port {port} is open")
    except Exception as e:
        print(f"Error scanning port {port}: {e}")

# Worker function to process ports from the queue
def worker(ip):
    while not port_queue.empty():
        port = port_queue.get()  # Get a port from the queue
        scan_port(ip, port)  # Scan the port
        port_queue.task_done()  # Mark the task as done

# Main function to set up the scanner
def port_scanner(ip, start_port, end_port):
    # Fill the queue with ports to scan
    for port in range(start_port, end_port + 1):
        port_queue.put(port)

    # Create and start threads
    threads = []
    for _ in range(NUM_THREADS):
        thread = threading.Thread(target=worker, args=(ip,))
        thread.start()
        threads.append(thread)

    # Wait for all threads to finish
    for thread in threads:
        thread.join()

if __name__ == "__main__":
    target_ip = input("Enter the IP address to scan: ")
    start_port = int(input("Enter the starting port: "))
    end_port = int(input("Enter the ending port: "))

    print(f"Scanning {target_ip} from port {start_port} to {end_port}...")
    port_scanner(target_ip, start_port, end_port)
    print("Scanning completed.")
