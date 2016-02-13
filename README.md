This experimental Docker setup for p5.js and its website potentially
makes development easier.

<img src="https://cloud.githubusercontent.com/assets/124687/13028015/5883c79a-d230-11e5-97cd-0f4d259cf5d8.png">

## Why Is This Useful?

From [What is Docker?][]:

> Docker allows you to package an application with all of its
> dependencies into a standardized unit for software development.

In short, it means that getting people set up with a development
environment, as well as deploying software to a webserver, can
*potentially* be made dramatically easier.

While developing for p5.js itself is already straightforward, contributing
to its website is not quite as easy, for a few reasons:

* The website contains a number of assets created by p5.js's toolchain,
  such as the reference documentation and p5.js itself, but exactly
  *how* those assets are copied over is complex and undocumented. Even
  if it were documented, properly configuring the "bridge" between the
  two repositories could still be error-prone.

* The website currently uses an entirely different technology stack (PHP)
  from p5.js's toolchain (node). This means extra setup and configuration
  time for a development environment.

This doesn't just make contributing difficult. It also means that it's
challenging to set up a mirror of p5js.org on a local area network,
which could be useful for events where internet connectivity is slow or
inconsistent.

This experiment aims to alleviate these problems. Whether it actually
succeeds is dependent partly on how short this README is, and whether
the learning curve for Docker is gentler than that of properly
configuring the two repositories manually.

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

At this point, you're all set. A few lines above this message will contain
a URL for you to visit. At that location will be your personal copy
of the p5 website.

Whenever you edit any files in the p5.js source code, any related
reference documentation and libraries will be rebuilt and made visible
on the website.

## Editing Files

See the [p5.js development overview][p5-dev-overview] for details on
the structure of the p5.js repository.

In general, the structure of the website is pretty intuitive: each page
on the site can be found on your filesystem by its relative URL. However,
the following files and directories shouldn't be directly edited by
you, as they are actually copied over from the p5.js repository
automatically whenever you change one of their source files:

* `p5.js-website/reference/` should not be edited directly. This reference
  documentation actually contains material from a variety of sources:

  * The individual p5 functions and variables are all documented next
    to their definition in the p5 source code.
  * The overall HTML structure of the reference, as well as some
    static assets, are contained in `p5.js/docs/yuidoc-p5-theme`.
  * The JavaScript code that powers the reference is contained in
    `p5.js/docs/yuidoc-p5-theme-src`.

* `p5.js-website/js/p5.*.js` files should not be edited directly, as
  they're copied over from the p5.js repository automatically.

So if you ever need to edit any of those files, edit their sources in the
p5.js repository instead: the build system will automatically detect your
changes and reflect them on the website as needed.

## Running Tests

Your entire p5.js checkout is exposed on your web server under the
`/p5.js/` path. Just browse there and you'll see a browseable index
of all files and folders in your checkout.

## Other Tasks

If you need to run a `grunt` task in the p5.js repository, just use
`docker-compose run p5 grunt`.

Need to run `npm`? Try `docker-compose run p5 npm`.

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
  [What is Docker?]: https://www.docker.com/what-docker
  [docker-linux]: https://docs.docker.com/linux/
  [Docker Compose]: https://docs.docker.com/compose/install/
  [docker-osx]: https://docs.docker.com/mac/step_one/
  [docker-windows]: https://docs.docker.com/windows/step_one/
  [Docker Machine]: https://docs.docker.com/machine/
  [p5-dev-overview]: https://github.com/processing/p5.js/wiki/Development#overview
