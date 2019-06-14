# Code Style

## Python

Please, follow the [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide. For more information about the Python code style, refer to the [The Hitchhiker’s Guide to Python](https://docs.python-guide.org/writing/style/).

## JavaScript

We follow the [Airbnb style guide](https://github.com/airbnb/javascript) for JavaScript. React specific guidelines can be found [here](https://github.com/airbnb/javascript/tree/master/react).

## Commit style

I personally use the [`gitmoji`](https://gitmoji.carloscuesta.me/) guide for my commit messages to keep them clean and simple. This is merely optional; your commits will be [_squashed_](https://github.blog/2016-04-01-squash-your-commits/) into master anyway :information_desk_person:

Please be thorough and specific with your commits. _Don't_ do anything like this:

```
 git add .
 git commit -m 'updated a lot of stuff'
```

Instead, be more thoughtful and specific:

```
git add /path/to/specific/file/
git commit -m 'quick summary of what you did'
```

I would go even further and add more details to the commit message with [`git commit --amend`](https://help.github.com/en/articles/changing-a-commit-message):

```
quick summary of what you did
- added more fields to profile model
- fixed bug where profile image wouldn't load
- added documentation to README
```
