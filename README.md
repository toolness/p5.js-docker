This experimental Docker setup for p5.js and its website potentially
makes development easier.

To use it, first install [Docker][] and [Docker Compose][].

Then clone the [p5.js][] and [p5.js-website][] repositories:

```
git clone git@github.com:processing/p5.js.git
git clone git@github.com:processing/p5.js-website.git
```

Then start everything up:

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

<!-- Links -->

  [p5.js]: https://github.com/processing/p5.js
  [p5.js-website]: https://github.com/processing/p5.js-website
  [Docker]: https://www.docker.com/
  [Docker Compose]: https://docs.docker.com/compose/
