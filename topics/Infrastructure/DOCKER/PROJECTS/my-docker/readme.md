PS C:\Users\002TEX744>  podman machine init podman-machine-default
Error: podman-machine-default: VM already exists



PS C:\Users\002TEX744>  podman machine start
Starting machine "podman-machine-default"
There is no distribution with the supplied name.
Error code: Wsl/Service/WSL_E_DISTRO_NOT_FOUND
Error: the WSL bootstrap script failed: command C:\WINDOWS\system32\wsl.exe [wsl -u root -d podman-machine-default /root/bootstrap] failed: exit status 0xffffffff



PS C:\Users\002TEX744> wsl --status
Default Distribution: Ubuntu
Default Version: 2

PS C:\Users\002TEX744> wsl --shutdown

PS C:\Users\002TEX744> podman machine rm -f podman-machine-default
Unregistering.
There is no distribution with the supplied name.
Error code: Wsl/Service/WSL_E_DISTRO_NOT_FOUND
time="2026-06-09T11:50:05+05:30" level=error msg="failed to remove virtual machine from provider for \"podman-machine-default\": command C:\\

PS C:\Users\002TEX744> wsl --install
A distribution with the supplied name already exists. Use --name to chose a different name.
Error code: Wsl/InstallDistro/ERROR_ALREADY_EXISTS



PS C:\Users\002TEX744> wsl --install
A distribution with the supplied name already exists. Use --name to chose a different name.
Error code: Wsl/InstallDistro/ERROR_ALREADY_EXISTS
PS C:\Users\002TEX744> wsl --update
Checking for updates.
Updating Windows Subsystem for Linux to version: 2.7.3.
PS C:\Users\002TEX744> wsl --status
Default Distribution: Ubuntu
Default Version: 2
PS C:\Users\002TEX744> wsl --set-default-version 2
For information on key differences with WSL 2 please visit https://aka.ms/wsl2
The operation completed successfully.
PS C:\Users\002TEX744> podman machine init
Looking up Podman Machine image at quay.io/podman/machine-os:5.8 to create VM
Getting image source signatures
Copying blob e2b6cbcadd8b done   |
Copying config 44136fa355 done   |
Writing manifest to image destination
e2b6cbcadd8b41b708fecb58a246a20d737dee0ef26872a3f75b575f77eba968
Extracting compressed file: podman-machine-default-amd64: done
Importing operating system into WSL (this may take a few minutes on a new WSL install)...
The operation completed successfully.
Configuring system...
Machine init complete
To start your machine run:

        podman machine start



===============================================

podman --version

podman images

podman run hello-world

podman images
podman ps -a

podman rm 5da6538db3a7
podman ps -a

podman images
podman rmi  quay.io/podman/hello:latest
podman images



podman build -t my-python-app .
podman run my-python-app
- Hello from podman