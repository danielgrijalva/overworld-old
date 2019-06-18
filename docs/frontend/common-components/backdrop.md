---
description: The background image component.
---

# Backdrop

### Description

The **backdrop** is the background image showed in a game's page, usually artwork or a screenshot from the game. It is also used in the landing page, and soon you'll be able to display one in your profile to showcase your favorite game.

Internally, the backdrop uses lazy loading with [react-lazy-images](https://github.com/fpapado/react-lazy-images). For that, we need two versions of the backdrop: a low resolution one and a 1080p one. The low resolution backdrop is only rendered while the 1080p one is loading, and has a `image-rendering: pixelated` CSS property.

Luckily for us, the IGDB API stores images in different sizes. It's very easy pick different versions of an image using the following URL structure:

```text
https://images.igdb.com/igdb/image/upload/t_{size}/{imageId}.jpg
```

As you can see, just provide the image ID and the size. We use `t_cover_small` for the small image and `t_1080p` for the actual backdrop. For more information about IGDB images, read [this](https://api-docs.igdb.com/?javascript#images). 

### Usage

To render a backdrop, simply pass in the `imageId` prop.

```jsx
import { Backdrop } from "./modules/app/components/";

<Backdrop imageId="jjn6e6ivua5u142iukql" />
```

### Props

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `imageId` | `string` | `true` | ID of the image for the backdrop. |

