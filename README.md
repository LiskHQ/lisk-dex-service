![Lisk DEX: Service](docs/assets/banner_service.png 'Lisk DEX: Service')

# Lisk DEX: Service

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/liskHQ/lisk-dex-service)
![GitHub repo size](https://img.shields.io/github/repo-size/liskhq/lisk-dex-service)
[![DeepScan grade](https://deepscan.io/api/teams/19600/projects/23053/branches/712229/badge/grade.svg?token=a1fa0980263b30233c0ddf1e9c3ed778290db2ee)](https://deepscan.io/dashboard#view=project&tid=19600&pid=23053&bid=712229)
![GitHub issues](https://img.shields.io/github/issues-raw/liskhq/lisk-dex-service)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/liskhq/lisk-dex-service)

Lisk DEX: Service is a web application middleware that allows the [Lisk DEX: UI](https://github.com/LiskHQ/lisk-dex-ui?tab=readme-ov-file#index) to interact with the [Lisk DEX: Core](https://github.com/LiskHQ/lisk-dex-core?tab=readme-ov-file#index) blockchain application. The project is based on upon [Lisk Service](https://github.com/LiskHQ/lisk-service) which is a Microservices-based implementation.

## Project Index

Below is an index of the repositories which relate to this repository for easy navigation:

|     | Repository                                                                               | Description                                             |
| --- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------- |
|     | [Lisk DEX: Specs](https://github.com/LiskHQ/lisk-dex-specs?tab=readme-ov-file#index)     | The Lisk DEX blockchain specifications.                 |
|     | [Lisk DEX: Core](https://github.com/LiskHQ/lisk-dex-core?tab=readme-ov-file#index)       | The Lisk DEX blockchain application.                    |
| X   | [Lisk DEX: Service](https://github.com/LiskHQ/lisk-dex-service?tab=readme-ov-file#index) | The Lisk DEX blockchain middleware between Core and UI. |
|     | [Lisk DEX: UI](https://github.com/LiskHQ/lisk-dex-ui?tab=readme-ov-file#index)           | The Lisk DEX blockchain user-interface.                 |

### Additional Services

Lisk DEX: Service adds the following microservices to the base set inherited from [Lisk Service](https://github.com/LiskHQ/lisk-service):

| Service                                     | Description                                                                                                                    |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [DEX Base](services/dex-base)               | The DEX Base service provides data related to liquidity provision and swaps, such as current pools, tokens, and prices.        |
| [DEX Goverance](services/dex-governance)    | The DEX Governance service provides data on proposals and votes which have been submitted to the DEX blockchain.               |
| [DEX Information](services/dex-information) | The DEX Information service provides statistical data about the DEX blockchain, such as top pools, top tokens, and past swaps. |

### Extended Gateway

Lisk DEX: Service extends the [Gateway](services/gateway) microservice with additional API endpoints that are specific to the Lisk DEX: Core blockchain application.

Below is a summary of the additional API endpoints:

#### DEX Base Endpoints

- `GET /api/dex/v1/getEventsByHeight`
  - Returns a list of events by height.
- `GET /api/dex/v1/tokens/popularPairings`
  - Returns a list of the top 6 frequently swapped token pairs.
- `GET /api/dex/v1/tokens/currentsqrtprice`
  - Returns the current sqrt price of a given pool.
- `GET /api/dex/v1/prices/gettingSlippageBounds`
  - Returns the slippage bounds for a given swap.
- `GET /api/dex/v1/gettingStatistics`
  - Returns statistics for transactions.
- `GET /api/dex/v1/pools/available`
  - Returns a list of available pools.
- `GET /api/dex/v1/prices/convert/token`
  - Converts a token price to the equivalent amount of another token price.
- `GET /api/dex/v1/prices/impact`
  - Returns the price impact on a swap trade on the market price of the pool.
- `GET /api/dex/v1/prices/convert/fiat`
  - Converts a token price to the equivalent amount of fiat.
- `GET /api/dex/v1/tokens/supported`
  - Returns a list of supported tokens.

#### DEX Governance Endpoints

- `GET /api/dex-governance/v1/proposals`
  - Returns all proposals, or a specific proposal if it was specified.
- `GET /api/dex-governance/v1/votes`
  - Returns details about the votes for a given account.

#### DEX Information Endpoints

- `GET /api/dex-information/v1/getTopPoolsFromDatabase`
  - Returns a list of top pools from the database.
- `GET /api/dex-information/v1/getTopTokensFromDatabase`
  - Returns a list of top tokens from the database.
- `GET /api/dex-information/v1/getTransactionsByTokenID`
  - Returns a list of transactions by tokenID.

## Installation

The default installation method for Lisk DEX: Service is using [Docker](https://www.docker.com/).

### Dependencies

The following dependencies need to be installed in order to run this application:

- [NodeJS Active LTS - ^v18.16](https://nodejs.org/en/about/releases/)
- [MySQL - ^v8.0.29](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/)
- [Docker](https://www.docker.com/) with [Docker compose](https://docs.docker.com/compose/install/)
- [GNU Make](https://www.gnu.org/software/make/) and [GNU Tar](https://www.gnu.org/software/tar/)

For information on how to install these dependencies on various operating systems, refer to the following documents:

- [Ubuntu 18.04 LTS Bionic Beaver](./docs/prerequisites_docker_ubuntu.md)
- [Ubuntu 20.04 LTS Focal Fossa](./docs/prerequisites_docker_ubuntu.md)
- [Debian 10 Buster](./docs/prerequisites_docker_debian.md)
- [MacOS 10.15 Catalina](./docs/prerequisites_docker_macos.md)

### Docker Images

To build the docker images, execute the following command:

```bash
make build-images
```

## Configuration

The default configuration is sufficient to run Lisk DEX: Service against a local node.

Before running the application, copy the default docker-compose environment file:

```bash
cp docker/example.env .env
```

As required, set the required environment variables.

```bash
$EDITOR .env
```

The various configuration options are described [in this document](./docs/config_options.md).

The current configuration can be reviewed with the command: `make print-config`.

## Management

To run the application container, execute the following command:

```bash
make up
```

Once the application container is started, Lisk DEX: Service (Gateway) is exposed accordingly:

```bash
http://localhost:9901 # HTTP API
ws://localhost:9901   # WebSocket RPC
```

To stop the application container, execute the following command:

```bash
make down
```

## Contributors

https://github.com/LiskHQ/lisk-dex-service/graphs/contributors

## Disclaimer

> [!WARNING]
> The source code contained within this repository has not been security audited and is therefore not suitable for usage in a production environment such as the Lisk Mainnet.
>
> By using the source code of the Lisk DEX: Service, you acknowledge and agree that you have an adequate understanding of the risks associated with the use of the source code of the Lisk DEX: Service and that it is provided on an “as is” and “as available” basis, without any representations or warranties of any kind. To the fullest extent permitted by law, in no event shall the Lisk Foundation or other parties involved in the development of the Lisk DEX: Service have any liability whatsoever to any person for any direct or indirect loss, liability, cost, claim, expense or damage of any kind, whether in contract or in tort, including negligence, or otherwise, arising out of or related to the use of all or part of the source code of the Lisk DEX: Service.

## License

Copyright 2016-2024 Lisk Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[lisk documentation site]: https://lisk.com/documentation
