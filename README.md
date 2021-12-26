<div align="center">
<img alt="Title: Video Encoding Course" src="https://user-images.githubusercontent.com/40371955/147414103-3600cdc8-d306-47b5-aeea-a0a32df33edc.png">
</div>

| The website for the Video Codification Systems course at Pompeu Fabra University. It contains all the content of the subject, along with video lessons and a video encoding tool.
|---|

The website is live and hosted at: https://video-encoding-course.vercel.app/ 

## Technology

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) that uses the [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) library, which allows mdx content to be loaded via `getStaticProps` or `getServerSideProps`. The mdx content is loaded from a local folder, but it could be loaded from a database or anywhere else. It is deployed with the [Vercel Platform](https://vercel.com/). 

The following libraries have been used:

- [TailwindCSS](https://tailwindcss.com/)
- [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- [react-dropzone](https://github.com/react-dropzone/react-dropzone)

### Run it locally

Download the repository, and install the dependencies ``npm install``. Afterward, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

## Design

You can find a hi-fi mockup design using Figma [here](https://www.figma.com/proto/uZMIyngoBi0jtGSPVP59Wf/Web---Video-Encoding?node-id=317%3A216&scaling=scale-down-width&page-id=317%3A215&starting-point-node-id=317%3A216&hide-ui=1). 

---

#### References


This website was developed as part of the Video Codification Systems course of the Audiovisual System Engineering Degree at Universitat Pompeu Fabra, Barcelona.

**License:** MIT
