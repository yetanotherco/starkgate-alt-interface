# StarkGate Bridge Alternative Interface

> [!CAUTION]
> Use with caution and at your own risk as this repository is still experimental and NOT production ready.

This an experimental alternative frontend interface implementation of
the [StarkGate Bridge](https://docs.starknet.io/documentation/tools/starkgate-bridge/). It is not production ready,
therefore use it at your own risk.

For a complete implementation of the StarkGate frontend, please refer to the official
repository [here](https://github.com/starknet-io/starkgate-frontend).

Special thanks to the Starkware team for their hard work.

## Objective

The objective of this project is to provide an alternative frontend interface for the Starknet StarkGate bridge to be
used in testnets & app chain environments like [Madara](https://github.com/keep-starknet-strange/madara) for example.

## Requirements

The following is required to run the webapp before you can get started:

* macOS, Windows (including WSL), or Linux system
* [Node.js 21.5.0](https://nodejs.org/en/blog/release/v21.5.0)+ (with npm: 10.2.4+)

<details>
<summary>In a fresh new ubuntu distro</summary>

* Install `curl`, `make`, `g++` and `git`:

```sh
sudo apt update && sudo apt install curl git make g++
# or without sudo
# apt update && apt install curl git make
```

* Install nodejs:

```sh
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
# or without sudo
# curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && apt-get install -y nodejs
```

</details>

## Getting Started

The project is based on [Next.js](https://nextjs.org/), a React framework for production. It
uses [TypeScript](https://www.typescriptlang.org/) and [Tailwind CSS](https://tailwindcss.com/).
The package manager is [pnpm](https://pnpm.io/), so you need to install it first.

```sh
make deps
```

This will try to install `pnpm` globally using the existing `npm` version (make sure to have
the [correct requirements installed](#requirements)) and then proceed to run `pnpm install`.

If you have `pnpm` installed globally already, you can run:

```sh
make install
``` 

Behind the scenes, this will do a `pnpm install` of the `package.json` dependencies, creating a `node_module` folder
locally.

### Environment Variables

The following table describes each environment variable used by the frontend and their descriptions:

| Variable                                  | Description                                             |
|-------------------------------------------|---------------------------------------------------------|
| `NEXT_PUBLIC_ETHEREUM_RPC_URL`            | The URL of the Ethereum RPC (used by `wagmi`).          |
| `NEXT_PUBLIC_STARKNET_RPC_URL`            | The URL of the Starkness RPC (used by `starknet-react`. |
| `NEXT_PUBLIC_WITHDRAWAL_CONTRACT_ADDRESS` | The withdrawal contract address.                        |
| `NEXT_PUBLIC_DEPOSIT_CONTRACT_ADDRESS`    | The deposit contract address.                           |

Run the following command to create a `.env` file based on `.env.example` with the required environment variables:

```sh
make create_env
```

This will create a `.env` file with the required environment variables. Make sure to update the values of the variables
in the `.env` file to match your environment.

### Development

To start a development build of the webapp, run:

```sh
make dev
```

This runs `next dev`, which starts the application in development mode with hot-code reloading, error reporting, and
more.

Then open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

Make sure to update environment variables in `.env` to match your environment. See `.env.example` for an example of
which variables are required. For more information, see the [Environment Variables](#environment-variables) section.

#### Running in a different port

To run the webapp in a different port, run:

```sh
make dev PORT=3069
```

This runs `next dev -p 3069`, which starts the application in development mode in port 3069.

#### Linting

To lint the webapp, run:

```sh
make lint
```

This runs `next lint`, which runs ESLint on the pages and components in the webapp and reports any linting errors.
Make sure to fix all linting errors before submitting a pull request.

### Production

To run the production build of the webapp, run:

```sh
make build
```

This runs `next build`, which generates an optimized version of your application for production. HTML, CSS, and
JavaScript files are created based on your pages. JavaScript is compiled and browser bundles are minified using the
Next.js Compiler to help achieve the best performance and support all modern
browsers[<sup>1</sup>](https://nextjs.org/docs/app/building-your-application/deploying#production-builds).

#### Running the production build

To start the production build of the webapp, run:

```sh
make start
```

This runs `next start`, which starts the Node.js server. This server supports all Next.js
features[<sup>2</sup>](https://nextjs.org/docs/app/building-your-application/deploying#nodejs-server).

Alternatively, you can run:

```sh
make deploy
```

This runs `next build && next start`, which builds and starts the application in production mode.

Then open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

#### Running in a different port

To run the webapp in a different port, run:

```sh
make start PORT=3069
```

or:

```sh
make deploy PORT=3069
```

This starts the application in production mode in port 3069.
