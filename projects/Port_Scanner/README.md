# Port Scanner

## Overview

A port scanner is a tool used to identify open ports and services available on a networked device. It works by attempting to connect to a range of ports on a specified IP address. If a connection is successful, the port is considered "open," indicating that a service is running on that port.

### Key Concepts

- **IP Address**: An Internet Protocol address is a unique identifier for a device on a network. It allows devices to communicate with each other.
- **Port**: A port is a virtual point where network connections start and end. Ports are identified by numbers (0-65535) and are used by protocols to differentiate between different services on a device (e.g., HTTP uses port 80, HTTPS uses port 443).

## Code Explanation

The code begins by importing necessary libraries:

```python
import socket
import threading
from queue import Queue
```

These imports provide the following functionalities:

- `socket`: Access to the BSD socket interface for network communication.
- `threading`: Enables the program to run multiple threads for concurrent operations.
- `Queue`: A thread-safe queue to manage ports to be scanned.

The number of threads to use for scanning is defined as:

```python
NUM_THREADS = 100
```

This constant determines the number of threads used for scanning. Increasing the number of threads can accelerate the scanning process.

A queue is created to hold the ports to be scanned:

```python
port_queue = Queue()
```

This queue holds the ports that need to be scanned, ensuring thread-safe access to the list of ports.

### Scanning Function

```python
def scan_port(ip, port):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(1)  # Set a timeout for the connection attempt
            result = s.connect_ex((ip, port))  # Try to connect to the port
            if result == 0:
                print(f"Port {port} is open")
    except Exception as e:
        print(f"Error scanning port {port}: {e}")
```

- **scan_port(ip, port)**: This function attempts to connect to a specified port on the given IP address.
  - `socket.socket(socket.AF_INET, socket.SOCK_STREAM)`: Creates a TCP socket.
  - `s.settimeout(1)`: Sets a timeout of 1 second for the connection attempt.
  - `s.connect_ex((ip, port))`: Attempts to connect to the specified IP and port. Returns 0 if successful (port is open).
  - If an error occurs, it prints an error message.

### Worker Function

```python
def worker(ip):
    while not port_queue.empty():
        port = port_queue.get()  # Get a port from the queue
        scan_port(ip, port)  # Scan the port
        port_queue.task_done()  # Mark the task as done
```

- **worker(ip)**: This function runs in each thread and processes ports from the queue.
  - It retrieves a port from the queue, scans it, and marks the task as done.

### Main Scanning Function

```python
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
```

- **port_scanner(ip, start_port, end_port)**: This function sets up the scanning process.
  - It fills the `port_queue` with ports in the specified range.
  - It creates and starts multiple threads to scan the ports concurrently.
  - It waits for all threads to finish before completing the scan.

```python
### Main Execution Block
if __name__ == "__main__":
    target_ip = input("Enter the IP address to scan: ")
    start_port = int(input("Enter the starting port: "))
    end_port = int(input("Enter the ending port: "))
    print(f"Scanning {target_ip} from port {start_port} to {end_port}...")
    port_scanner(target_ip, start_port, end_port)
    print("Scanning completed.")
```

- This block runs when the script is executed directly.
- It prompts the user for the target IP address and the range of ports to scan.
- It calls the `port_scanner` function to perform the scan and prints the results.

## How to Use

1. **Run the Script**: Execute the script in a Python environment.
2. **Input the Target IP**: When prompted, enter the IP address of the device you want to scan.
3. **Specify Port Range**: Enter the starting and ending port numbers for the scan.
4. **View Results**: The script will output which ports are open on the specified IP address.
