Building a webite where people can share their simple ideas and get feedback.
A kickstarter without an MVP.

How I added bootstarp:

http://www.manuel-schoebel.com/blog/meteorjs-and-twitter-bootstrap---the-right-way
https://github.com/Nemo64/meteor-bootstrap

Routing:
https://github.com/iron-meteor/iron-router/blob/devel/Guide.md

Meteor loading rules:

The JavaScript and CSS files in an application are loaded according to these rules:

Files in the lib directory at the root of your application are loaded first.

Files that match main.* are loaded after everything else.

Files in subdirectories are loaded before files in parent directories, so that files in the deepest subdirectory are loaded first (after lib), and files in the root directory are loaded last (other than main.*).

Within a directory, files are loaded in alphabetical order by filename.

These rules stack, so that within lib, for example, files are still loaded in alphabetical order; and if there are multiple files named main.js, the ones in subdirectories are loaded earlier.