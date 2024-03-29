<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/angelle-sw/storms.watch">
    <img src="https://raw.githubusercontent.com/angelle-sw/storms.watch/master/public/images/logo.png" alt="Logo" width="600">
  </a>

<h3 align="center">storms.watch</h3>

  <p align="center">
  We in storm mode, baby.
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

storms.watch is the premier location to watch hurricane streams and stay up to date on all the latest tropical storms. Storm streams are hand-picked while we are in storm mode (an active storm is in the gulf) for your viewing, along with a feed from /r/TropicalWeather, and tropical weather Twitter.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

[![Typescript][typescript-badge]][typescript-url] [![Next][next.js]][next-url] [![React][react.js]][react-url] [![Styled Components][styledcomponents-badge]][styledcomponents-url]
[![Mongo DB][mongodb-badge]][mongodb-url]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- node
- yarn

### Installation

1. Clone the repo

   ```sh
   $ git clone https://github.com/angelle-sw/storms.watch.git
   ```

2. Install packages

   ```sh
   $ yarn install
   ```

3. Enter environment variables in `.env`

   ```sh
   MONGO_DB_URI=<mongo-db-uri>
   ADMIN_PASSPHRASE=<admin-passphrase>
   ```

4. Set an item in the cookies of the site

   ```sh
   document.cookie="adminPassphrase=<admin-passphrase>"
   ```

5. Run a local development environment

   ```sh
   $ yarn dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- API Spec -->

## API Spec

| Type   | Endpoint                     | Body                                                            | Headers                         | Response                                                         |
| ------ | ---------------------------- | --------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------- |
| `POST` | `/api/postVideoSources`      | `{id: string; status: boolean; title: string; url: string; }[]` | `{ admin-passphrase: string; }` | `{ id: string; status: boolean; title: string; url: string; }[]` |
| `POST` | `/api/toggleStormModeStatus` | --                                                              | `{ admin-passphrase: string; }` | `boolean`                                                        |
| `GET`  | `/api/getStormModeStatus`    | --                                                              | `{ admin-passphrase: string; }` | `boolean`                                                        |
| `GET`  | `/api/getVideoSources`       | --                                                              | --                              | `{ id: string; status: boolean; title: string; url: string; }[]` |
| `GET`  | `/api/getAdminStatus`        | --                                                              | `{ admin-passphrase: string; }` | `boolean`                                                        |

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- DEBUGGING -->

## Debugging

Use a supported url query param to override the database values

| Key               | Value     | Description                            |
| ----------------- | --------- | -------------------------------------- |
| `stormModeStatus` | `boolean` | Forces the app in or out of storm mode |

<p align="right">(<a href="#top">back to top</a>)</p>
<!-- ROADMAP -->

## Roadmap

- [ ] Support multiple concurrent storms
- [ ] Toggleable social feed drawer

See the [open issues](https://github.com/angelle-sw/storms.watch/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- mr. min
- charlie
- f off
- pigs
- cinnamon toast crunch
- great american cookie company

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[typescript-badge]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[styledcomponents-badge]: https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[styledcomponents-url]: https://styled-components.com/
[mongodb-badge]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
