# ACore docker compose

<img src="https://www.azerothcore.org/images/logo.png" alt="logo" width="200"/>

* Table of Contents
{:toc}

Video Demo:

[![ACore Docker Demonstration](https://img.youtube.com/vi/ldDkI2R431k/0.jpg)](https://www.youtube.com/watch?v=ldDkI2R431k)

The docker compose file included in this folder provides an easy way to use the azerothcore images available on [docker hub](https://hub.docker.com/u/acore) .
It means that you will be able to run a clean azerothcore server without installing anything but docker.

NOTE: You can re-use this docker compose configuration inside another project to test AzerothCore together
with another application, for instance an API or a website based on docker compose.

The original repository with the sources and the workflows to generate the images used by this docker compose is available [here](https://github.com/azerothcore/azerothcore-wotlk)

Do you have any questions? Open an [issue here](https://github.com/azerothcore/acore-docker/issues)

## Requirements

* [Docker](https://docs.docker.com/get-docker/)
* [Git](https://git-scm.com/downloads) to clone our repo (suggested), otherwise you can manually [download it](https://github.com/azerothcore/acore-docker/archive/refs/heads/master.zip)

## Getting started

First of all, download or clone [this repository](https://github.com/azerothcore/acore-docker).
If you want to clone the repo you have to open a terminal and run this command: **git clone https://github.com/azerothcore/acore-docker**

To open a terminal inside a specific folder in your operating system check [this interesting article](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

Now run this magic command sequence inside the downloaded folder to have everything up and running (with an interactive worldserver terminal): 

```Bash
docker compose up
```

**Wait for few minutes and you have an up and running AzerothCore!**

 The first installation will take a while because it needs to download the images from the docker hub and create the entire database before running the server**

### How to run in background

If you need to run them in background instead you can use the following command:

```Bash
docker compose up -d
```

**IMPORTANT:** 

* If the application crashes, docker will automatically restart the container for you

## Access the worlserver console and create an account

With **docker compose up** we have an up and running worldserver as well, but you need to access its interactive shell to
run commands on the worldserver.


Open another terminal and use this command to access the worldserver console

```Bash
docker attach acore-docker-ac-worldserver-1
```

Now you can use the worlserver console to run azerothcore commands.

To create an account you can use: `account create <user> <password> <confirm password>`

NOTE: you can detach from a container and leave it running using the CTRL-p CTRL-q key sequence.

The list of GM commands is available [here](https://www.azerothcore.org/wiki/GM-Commands)

Do you need a **game client**? check [this page](https://www.azerothcore.org/wiki/client-setup)! 

## Ask for support

If you need support about the docker installation, use one of the following channels:

* Join our discord community: https://discord.gg/mMgdcx37bA 
* Report an issue on github: https://github.com/azerothcore/acore-docker/issues

If your issue is about the server or you want to report a bug, check our page on [How to ask for help](https://www.azerothcore.org/wiki/how-to-ask-for-help)


## Stop or restart the services

There are several commands to stop or restart the services, depending on your needs:

* **docker compose ps**: list all the running containers
* **docker compose stop** : just stops the current running services
* **docker compose restart** : restarts the current running services
* **docker compose down --remove-orphans** : stops and removes the containers.
* **docker compose down --rmi all -v --remove-orphans** : ⚠️ stops, removes, and deletes EVERYTHING. Including the volumes with the associated database ⚠️

## Update your services with latest images

You just need to combine the following commands:

```Bash
docker compose down
docker compose pull
docker compose rm -s -v -f ac-client-data
```

**NOTE:** `docker compose rm -s -v -f ac-client-data` is used to recreate the client data volume with the newest files. 
If you're using your own maps, you should not use this command and regenerate the maps by your own instead (read the paragraph below)

## Dev server (Experimental)

```Bash
docker compose up ac-dev-server [-d]
```

The ac-dev-server is a special container that provides a complete workspace that includes all the sources and dependencies to build your own server.
This image is intended to be used together with the [VSCode Docker extension](https://code.visualstudio.com/docs/containers/overview)

NOTE: This container uses the same mysql instance of the ac-authserver/worldserver, so it's not suggested to use all the services to avoid
issues with the database consistence. However, you can always extends the docker compose to add a second database instance (read the paragraph below)

NOTE 2: This is an experimental system. For complete support we still suggest to use the docker layer of the [azerothcore-wotlk]((https://github.com/azerothcore/azerothcore-wotlk)) repository.

## Customize your server

*NOTE: to unlock 100% power of AzerothCore, please use the [main repo](https://github.com/azerothcore/azerothcore-wotlk) and [compile it by your self](https://www.azerothcore.org/wiki/Installation)!*

Despite using the [GM commands](https://www.azerothcore.org/wiki/GM-Commands) to operate within the CLI or in game, you have the flexibility to extend/configure
your server with the following techniques:


### Change your docker configurations with the environment variables

Within the **/conf/dist** folder you can find a sample of the **.env** file which you can copy inside the root folder of this project to 
change certain **docker compose** configurations, such as changing the ports of your docker services or the volumes path etc.

Check the comments inside that file to understand how to use those variables.
### Extends the default docker compose

With the combination of the [docker compose.override](https://docs.docker.com/compose/extends/) and the environment variables available to configure
the AzerothCore project, you can extend this docker by adding external and shared volumes, change configurations and even add multiple realms.

### How to create a second multirealm environment

Check the /conf/dist folder that contains an override file ready to be used to implement a secondary worldserver

### Customize your server with the database

The database service available within the docker compose expose a mysql port that can be accessed by any mysql client
However, our docker compose also provides a pre-configured phpmyadmin container that can be used to access the database.

What you need to do is the following:

1. **docker compose up phpmyadmin** to startup the phpmyadmin container
2. connect to **https://127.0.0.1:8080** (unless you changed the port)
3. insert the db credentials. By default:  ac-database (host), root (user), password (password)

You are ready to go! 

Check the [AzerothCore wiki](https://www.azerothcore.org/wiki/documentation_index) to learn how to work with the AC database
### Customize your server with Lua scripts

The worldserver container included in our docker compose integrates the Eluna module

You just need to install your lua scripts inside the /scripts/lua folder and you are ready to go!

Check the [Eluna documentation](https://github.com/ElunaLuaEngine/Eluna/blob/master/README.md) to learn how to work with this system

### Customize your server with TypeScript

This project also integrates the [Eluna-TS](https://github.com/azerothcore/eluna-ts) system which allows you to create your custom scripts in Typescript! 

What you need is just create an "index.ts" within the **/scripts/typescript** folder and you can directly start by writing your scripts there or creating other files to import.

Inside our **docker compose.yml** there's the **ac-eluna-ts-dev** service which check changes on **/scripts/typescript** folder to automatically recompile your TS files into Lua.

**Disclaimer:** Eluna-TS is based on [TypeScriptToLua](https://typescripttolua.github.io/) which is a Typescript limited environment. You cannot use all the Typescript features, check their page for more info.

### Extract client data by your self with the ac-dev-tools container

Within your **.env** file set this variable: **DOCKER_CLIENT_DATA_FOLDER=** with the **absolute path** of the "Data" folder of your game client.

Now run this command: **docker compose run --rm ac-dev-tools bash** to access the shell of the **ac-dev-tools** container. Once inside you can run the following commands:

* **./maps** -> to extract dbc and maps
* **./vmap4extractor && ./vmap4assembler** -> to extract and assemble the vertical maps
* **./mmaps_generator** -> to extract and generate the movement maps

After the extraction (it can take hours) the file will be available inside the `ac-client-data-*` volumes.


