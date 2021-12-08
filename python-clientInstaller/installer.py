from pyuac import main_requires_admin
from os import path, scandir, system, name, remove
from io import BytesIO
from urllib.request import urlopen
from zipfile import ZipFile
import sys
import requests

AUDIUS_PATH = path.join(path.expandvars(r'%LOCALAPPDATA%'), "Programs", "audius-client")
LATEST_PATH = "https://audius-asheversion.s3.eu-west-1.amazonaws.com/latest.zip"

def download():
    system('cls' if name == 'nt' else 'clear')
    file_name = "latest.zip"
    with open(file_name, "wb") as f:
        print("Downloading Client...")
        response = requests.get(LATEST_PATH, stream=True)
        total_length = response.headers.get('content-length')

        if total_length is None: # no content length header
            f.write(response.content)
        else:
            dl = 0
            total_length = int(total_length)
            for data in response.iter_content(chunk_size=4096):
                dl += len(data)
                f.write(data)
                done = int(50 * dl / total_length)
                sys.stdout.write("\r[%s%s]" % ('=' * done, ' ' * (50-done)) )    
                sys.stdout.flush()
    with ZipFile(open(file_name, "rb").read(), "r") as zfile:
        zfile.extractall(AUDIUS_PATH)
    remove("latest.zip")

@main_requires_admin
def main():
    if path.exists(AUDIUS_PATH) == True:
        SOURCE_FILES = []
        with scandir(AUDIUS_PATH) as i:
            for entry in i:
                if entry.is_file():
                    SOURCE_FILES.append(entry.path)
        print(f"Audius Installation was found at expected directory ({AUDIUS_PATH})! Installing custom build...")
        print("Removing old folder...")
        for i in range(len(SOURCE_FILES)-1):
            print(f"Removing files... {i}/{len(SOURCE_FILES)-1}")
            system("del /f /q " + SOURCE_FILES[i])
        print("Removing folder...")
        system("rmdir /s /q " + AUDIUS_PATH)
        print("Finished removing old folder! Installing new folder...")
    else:
        print(f"Audius Installation could not be found at expected directory ({AUDIUS_PATH}). Installing custom build...")
    try:
        download()
        input("Installation complete! Press enter to exit...")
    except Exception as e:
        input(f"Installation failed! Full traceback: {e} Press enter to exit...")

main()