[![Build Status](https://travis-ci.com/fabriceHategekimana/projet_informatique-moviet.svg?branch=develop)](https://travis-ci.com/fabriceHategekimana/projet_informatique-moviet)  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fabriceHategekimana_projet_informatique-moviet&metric=alert_status)](https://sonarcloud.io/dashboard?id=fabriceHategekimana_projet_informatique-moviet)

# Moviet project
This project is for the course projets informatics (pinfo) given in third year bachelor of computer science at University of Geneva. This project was imported from the project that was originally in [Fabrice Hategekimana's github](https://github.com/fabriceHategekimana/projet_informatique-moviet).

Members:
- Project manager: Mohsen Hassan Naeini
- Backend: [Ethan Icet](https://github.com/Ethan-Icet)
- Backend: [Stéphane Liem Nguyen](https://github.com/Zenchiyu/) (is also [crystalzenchi](https://github.com/crystalzenchi))
- Auth & Kubernetes: [Erwan Don](https://github.com/Shamaii)
- Frontend: [Raphaël Maggio-Aprile](https://github.com/R-Maggio)
- Kubernetes: [Fabrice Hategekimana](https://github.com/fabriceHategekimana)


We created a website in which we could join groups and vote for movies. Even though the recommendation or voting part was handcrafted and very basic, the goal of this project was to discover principles.

### Useful links:
- Original project's [wiki](https://github.com/fabriceHategekimana/projet_informatique-moviet/wiki)
- [Project's template](https://github.com/crystalzenchi/microservices) forked from https://github.com/hostettler/microservices


---
# Run locally using scripts

## Build project and Docker images and run Docker containers


Make the file executable then run the script (but make sure no Docker containers having same names are currently running otherwise use the `kill_remove_containers.sh` script before running `run_locally.sh`):
```bash
$ chmod u+x scripts/run_locally.sh

$ ./scripts/run_locally.sh
```


## Kill and remove Docker containers
Make the file executable then run the script:
```bash
$ chmod u+x scripts/kill_remove_containers.sh

$ ./scripts/kill_remove_containers.sh
```

# Run locally manually

All commands should be in super-user.

## Build

In the current directory:
```bash
$ mvn clean install
```

Output should look like:
```
...
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary for Moviet Microservices 0.1.0-SNAPSHOT:
[INFO]
[INFO] Moviet Microservices ............................... SUCCESS [  0.447 s]
[INFO] Group Service ...................................... SUCCESS [  4.943 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  5.548 s
[INFO] Finished at: 2021-03-28T11:18:11+02:00
[INFO] ------------------------------------------------------------------------
```


## Docker images

We have to make sure first that the docker daemon is running (with `ps -a` and check if `dockerd` is running, otherwise do `sudo dockerd`)
```bash
$ mvn install -Ppackage-docker-image
```

Output should look like:
```
...
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary for Moviet Microservices 0.1.0-SNAPSHOT:
[INFO]
[INFO] Moviet Microservices ............................... SUCCESS [  1.148 s]
[INFO] Group Service ...................................... SUCCESS [  9.105 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  10.405 s
[INFO] Finished at: 2021-03-28T11:30:27+02:00
[INFO] ------------------------------------------------------------------------
```

**Remark(s):**
* (copied from [Maven Introduction](https://github.com/PInfo-2020/Exercises/blob/master/maven/MavenIntroduction.md)) When you define profiles in a POM, you can also pass them as argument to Maven with the -P option. In the microservices example, the command mvn install -Ppackage-docker-image runs the install lifecycle of Maven on the package-docker-image profile.


And to make sure the Docker images have been created:
```bash
$ docker image ls | grep unige
```

Output should look like:
```
unige/group-service                             latest          e66e2588a92f   3 minutes ago   706MB
```

### Start a single docker container
For the `group-service`, we can do this:
```bash
$ docker run -p 10080:8080 --name=group-service unige/group-service & 
```
The `&` specifies that we want the process to be in background. We should see `Thorntail is Ready`.

We can check that it works by going to `localhost:10080/groups` to see all the groups and `http://localhost:10080/groups/{id}` with `{id}` being the id of an existant group in the list of groups, for instance `42`: `http://localhost:10080/groups/42` (Currently, the "no group corresponding to the id" is not handled).
