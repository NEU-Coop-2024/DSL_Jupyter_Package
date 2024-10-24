Upon first cloning the repository, run:

`make`

This will install dependencies, build and install the extension, and run the notebook in headless form. If the build is successful, you should be able to confirm the extension is opeartion through the browser.

- If running locally, copy one of the links printed out. It will have the form `http://localhost:<PORT>/tree?token=<TOKEN>`
- If running remotely, first run `ssh -L <PORT>:localhost:<PORT> <username>@<REMOTEHOST>` locally where <PORT> is the port printed out in the link provided by the Jupyter notebook server remotely. Then navigate to the link using the browser. 


After downloading the repository, you can build and run each time with the `make run` command. If you need to refresh the github dependencies, run `make clean` first.

This repo also requires the installation of jupyter-tikz: https://pypi.org/project/jupyter-tikz/