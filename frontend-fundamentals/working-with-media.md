---
prev:
  text: "Semantic HTML"
  link: "./semantic.md"
next:
  text: "HTML Forms"
  link: "./forms"
---

# Working with Images, Audio and Video

In HTML you can use the `img` tag to insert images into your pages, and the `audio` and `video` elements to add sound and video content. The `audio` element typically supports mp3, wav, ogg formats, and the `video` supports mp4, ogg, webm, but the supported formats and codecs depend on the browser.

In all three cases you can specify the location of the file with the `src` attribute. Source can be set to any valid URL.

```html
<img src="cat.jpeg" alt="A cat" />
<audio src="myAudio.mp3" controls></audio>
<video src="myVideo.mp4" controls width="400"></video>
```

Browsers don't all support the same file types, therefore you can provide multiple `source` tags for audio of various formats. The browser will select the first source it understands.

```html
<audio controls>
  <source src="myAudio.mp3" type="audio/mpeg" />
  <source src="myAudio.ogg" type="audio/ogg" />
  <p>
    Download <a href="myAudio.mp3" download="myAudio.mp3">MP3</a> or
    <a href="myAudio.ogg" download="myAudio.ogg">OGG</a> audio.
  </p>
</audio>
```

## Images

In case of images, you typically will want to specify a size in which to display the images. If you are using images that are much larger than the size they will appear in on the website, you are making your users download an unnecessary amount of data.

You should also consider the file format you use: PNG and JPG are the most popular, but no longer the most ideal. Unless you need to support for older browsers, consider using more optimized formats, like _WEBP_ or _AVIF_.

You can also consider using compression algorithms. However, some formats are not lossless: a compressed JPG will be of lower quality.

### SVGs

Scalable vector graphics are an image type that scale without loss of quality. A vector graphic tracks data based on paths and equations instead of tracking the color value for each pixel. As a result they can be scaled to any size without impacting the quality. SVGs store data in XML, which makes the possible to use in raw HTML.

::: details Examples

```html
<!-- Smiley -->
<svg
  width="100"
  height="100"
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    cx="50"
    cy="50"
    r="45"
    stroke="black"
    stroke-width="4"
    fill="yellow"
  />
  <circle cx="35" cy="40" r="5" fill="black" />
  <circle cx="65" cy="40" r="5" fill="black" />
  <path
    d="M35 65 Q50 80 65 65"
    stroke="black"
    stroke-width="4"
    fill="transparent"
  />
</svg>

<!-- Star Icon -->
<svg
  width="50"
  height="50"
  viewBox="0 0 24 24"
  fill="gold"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 2L14.9 8.6L22 9.3L17 14.1L18.3 21.2L12 17.8L5.7 21.2L7 14.1L2 9.3L9.1 8.6L12 2Z"
  />
</svg>

<!-- Heart Icon -->
<svg
  width="50"
  height="50"
  viewBox="0 0 24 24"
  fill="crimson"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 6 4 4 6.5 4C8 4 9.5 4.8 10.5 6.09C11.5 4.8 13 4 14.5 4C17 4 19 6 19 8.5C19 12.28 15.6 15.36 10.45 20.04L12 21.35Z"
  />
</svg>

<!-- Checkmark Icon -->
<svg
  width="50"
  height="50"
  viewBox="0 0 24 24"
  fill="green"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M20.29 5.71L9 17L3.71 11.71L5.12 10.29L9 14.17L18.88 4.29L20.29 5.71Z"
  />
</svg>
```

:::

## Audio and Video Player

In the case of audio/video, if you want to see the actual audio player, you need to add the `controls` (boolean) attribute. This lets users manage the playback: adjust volume, pause or resume playback. If this attribute is not set, no controls will be shown. There are also several other attributes:

- `loop` makes the audio/video file replay continuously
- `muted` will start the audio/video in a muted state
- `autoplay` will automatically start playback as soon as it can do so
- `controlslist` lets you specify, which controls to show (its values are `nodownload`, `nofullscreen` and `noremoteplayback`)
- `preload` lets you preload certain parts of the audio/video data (values: `none`, `metadata`, `auto`)

The video element has additional attributes, e.g. `width`, `height` and others. The `poster` attribute will display an image while the video loads.

Learn more about the [audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio) and [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video) elements on MDN.

## Fair Use

If you want to use media from other authors, you have to be aware of the various types of licenses, and what these entail. In the case of most images the creator holds all copyright. Some images are released under a permissive license. These are available for use in your website under various conditions. You might be required to make your website open source, or you may not be permitted to modify the image. Some are released to the public domain, and can be used without restrictions.

There are sites that offer free-to-use images, like [Pixabay](https://pixabay.com/) or [Unsplash](https://unsplash.com/). Search engines often let you filter the images by license.
