<h1 align=center>Strapi Plugin Vercel</h1>

<p align=center>
   List deployments and deploy directly from Strapi.
</p>

<p align=center>
🕹 <a href="https://f3l1x.io">f3l1x.io</a> | 💻 <a href="https://github.com/f3l1x">f3l1x</a> | 🐦 <a href="https://twitter.com/xf3l1x">@xf3l1x</a>
</p>

<p align=center>
    <a href="https://github.com/f00b4r/strapi-plugin-vercel/actions">
        <img src="https://badgen.net/github/checks/f00b4r/strapi-plugin-vercel">
    </a>
    <a href="https://www.npmjs.com/package/strapi-plugin-vercel">
        <img src="https://badgen.net/npm/v/strapi-plugin-vercel">
    </a>
    <a href="https://www.npmjs.com/package/strapi-plugin-vercel">
        <img src="https://badgen.net/npm/dt/strapi-plugin-vercel">
    </a>
    <a href="/LICENSE">
        <img src="https://badgen.net/github/license/f00b4r/strapi-plugin-vercel">
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

If you want to use [Vercel](https://vercel.com) as a platform for your website built on Strapi, you need to tell Vercel when to rebuild your site.
Of course, you can use webhook, but it can trigger a lot of pipelines. With this plugin, you will have a recreation of the vercel dashboard on
your strapi dashboard, with which you can easily trigger deploys.

This plugin solves:

- manual triggering deployment to Vercel
- list of latest deployments
- current status of deployment

## Documentation

1. Install plugin.
2. Edit configuration.

    #### `{strapi}/config/server.js`

    There must be root key `vercel`.

    ```js
    module.exports = ({ env }) => ({
        {
            ...
        },
        vercel: {
            token: env('VERCEL_TOKEN'),
            projectId: env('VERCEL_PROJECT_ID'),
            triggers: {
                production: env('VERCEL_TRIGGER_PRODUCTION')
            },
        }
    });
    ```

    #### Token

    Generate token on `https://vercel.com/account/tokens`.

    #### Project ID

    Get from API endpoint or inspect `https://vercel.com/{team}/{project}` page in devtools. It should begin with `prj_...`

    #### Trigger

    Generate webhook on `https://vercel.com/{team}/{project}/settings/git` and copy the last string (webhook id).

    ```
    https://api.vercel.com/v1/integrations/deploy/abcdefghijklm/vwxyzvwxyzzz/
    |                                                 ^^             ^^
    |                                           / project id  / webhook id /
    ```

3. Edit administration section. Create these directories if you don't have them yet.

    #### `{strapi}/admin/src/containers/HomePage/index.js`

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

4. Profit 🚀

## Development

<a href="https://github.com/f3l1x">
    <img width="80" height="80" src="https://avatars2.githubusercontent.com/u/538058?v=3&s=80">
</a>

-----

Consider to [support](https://github.com/sponsors/f3l1x) **f3l1x**. Also thank you for using this package.
