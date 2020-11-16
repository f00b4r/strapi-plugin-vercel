<h1 align=center>Strapi Plugin Vercel</h1>

<p align=center>
   List deployments and deploy directly from Strapi.
</p>

<p align=center>
🕹 <a href="https://f3l1x.io">f3l1x.io</a> | 💻 <a href="https://github.com/f3l1x">f3l1x</a> | 🐦 <a href="https://twitter.com/xf3l1x">@xf3l1x</a>
</p>

<p align=center>
    <a href="https://github.com/webkitty/strapi-plugin-vercel/actions">
        <img src="https://badgen.net/github/checks/webkitty/strapi-plugin-vercel">
    </a>
    <a href="https://www.npmjs.com/package/strapi-plugin-vercel">
        <img src="https://badgen.net/npm/v/strapi-plugin-vercel">
    </a>
    <a href="https://www.npmjs.com/package/strapi-plugin-vercel">
        <img src="https://badgen.net/npm/dt/strapi-plugin-vercel">
    </a>
    <a href="/LICENSE">
        <img src="https://badgen.net/github/license/webkitty/strapi-plugin-vercel">
    </a>
</p>

![](/docs/screenshot.png)

-----

## Usage

To install latest version use [NPM](https://npmjs.com).

```
npm install --save strapi-plugin-vercel
```

## Overview

If you want to use [Vercel](https://vercel.com) as a platform for your website you need to tell Vercel when to rebuild your site.
Of course, you can use webhook, but it can trigger a lot of pipelines. With this plugin, you will see last vercel's deploments and
can easily trigger deploy with button.

## Documentation

1. Install plugin.
2. Edit configuration.

    #### `/config/server.js`

    There must be root key `vercel`.

    ```js
    module.exports = ({ env }) => ({
        {....},

        vercel: {
            token: env('VERCEL_TOKEN'),
            teamId: env('VERCEL_TEAM_ID'),
            projectId: env('VERCEL_PROJECT_ID'),
            triggers: {
                production: env('VERCEL_TRIGGER_PRODUCTION')
            },
        }
    });
    ```

    #### Token

    Generate token on `https://vercel.com/account/tokens`.

    #### Team ID

    Get from API endpoint or inspect `https://vercel.com/{team}` page in devtools.

    #### Project ID

    Get from API endpoint or inspect `https://vercel.com/{team}/{project}` page in devtools.

    #### Trigger

    Generate webhook on `https://vercel.com/{team}/{project}/settings/git` and parse last string.

    ```
    |--------------------------------------------/project id --/ webhook id /
    https://api.vercel.com/v1/integrations/deploy/abcdefghijklm/vwxyzvwxyzzz/
    ```

3. Edit administration.

    #### `admin/src/containers/HomePage/index.js`

    ```js
    import React, { memo } from "react";
    import { Padded } from "@buffetjs/core";
    import { Header } from "@buffetjs/custom";
    import { Deployments, DeployButton } from "./../../../../plugins/strapi-plugin-vercel/admin/src/view";

    const Dashboard = () => {
        return (
            <>
            <Padded top right left size="md">
                <Header
                title={{ label: "Dashboard" }}
                actions={[
                    { Component: DeployButton },
                ]}
                />
            </Padded>
            <Padded right left size="md">
                <Deployments />
            </Padded>
            </>
        );
    };

    export default memo(Dashboard);
    ```

## Development

<a href="https://github.com/f3l1x">
    <img width="80" height="80" src="https://avatars2.githubusercontent.com/u/538058?v=3&s=80">
</a>

-----

Consider to [support](https://github.com/sponsors/f3l1x) **f3l1x**. Also thank you for using this package.
