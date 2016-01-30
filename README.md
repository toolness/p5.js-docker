This experimental Docker setup for p5.js and its website potentially
makes development easier.

## Setup

### Step 1: Clone Repositories

First clone this repository, and inside it, 
clone the [p5.js][] and [p5.js-website][] repositories:

```
git clone git@github.com:toolness/p5.js-docker.git
cd p5.js-docker
git clone git@github.com:processing/p5.js.git
git clone git@github.com:processing/p5.js-website.git
```

### Step 2: Install Docker

#### OS X

Install [Docker Toolbox][docker-osx] and run the rest of these
instructions in a **Docker Quickstart Terminal**.

#### Linux

Install [Docker][docker-linux] and [Docker Compose][].

#### Windows

At the time of this writing, I recommend manually setting up
a Linux virtual machine and using Docker inside that, as
Docker Compose for Windows still has lots of limitations. This is
what I do on my Windows desktop.

However, if you're up for an adventure, try installing
[Docker Toolbox][docker-windows] and run the rest of these
instructions in a **Docker Quickstart Terminal**.

### Step 3: Start Everything Up

To start everything up, run:

```
docker-compose up
```

You'll have to wait a while as various things are configured and installed,
but eventually you should see the text:

```
p5_1      | Waiting for source files to change...
```

At this point, you're all set!

If you're on Linux, you should be able to visit http://localhost:8000/
directly to access the p5 website. If you're on OS X or Windows, you'll
likely have to visit port 8000 on the IP address given to you by
`docker-machine ip default`.

Whenever you edit any files in the p5.js source code, any related
reference documentation and libraries will be rebuilt and made visible
on the website.

## Limitations and Common Issues

* If you're running Docker on OS X or Windows, the hard work is all
  being done behind-the-scenes by a Linux-based virtual machine. The
  software used to communicate between your OS and the VM is called
  [Docker Machine][]. This indirection can sometimes cause
  difficulties.

  For instance, if your development environment suddenly loses its
  internet connection, try the following:

  ```
  docker-machine stop default
  docker-machine start default
  ```

## Uninstalling

If you decide this solution isn't for you, you'll want to run a few
commands to free up some Docker resources that exist outside of the
repository directory. From the root of the repository, run:

```
docker-compose stop
docker-compose rm
docker rmi p5jsdocker_p5
```

Now you can delete the repository directory.

<!-- Links -->

  [p5.js]: https://github.com/processing/p5.js
  [p5.js-website]: https://github.com/processing/p5.js-website
  [docker-linux]: https://docs.docker.com/linux/
  [Docker Compose]: https://docs.docker.com/compose/install/
  [docker-osx]: https://docs.docker.com/mac/step_one/
  [docker-windows]: https://docs.docker.com/windows/step_one/
  [Docker Machine]: https://docs.docker.com/machine/
