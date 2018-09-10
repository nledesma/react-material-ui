## React Material UI Inbox

### Docker dev environment

- First build the image:

`docker build --rm -t react-ui --file dockerfile .`

- Make sure to have the environment variables stored in a `.env` file in the root direactory:

`
API=<your api url>
`

- Then run the image on a container (with port forwarding, and mounting ):

`docker run --rm --volume $(pwd):/usr/src --name reactUi -p 3005:3005 react-ui`

