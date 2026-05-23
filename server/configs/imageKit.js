import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PUBLIC_KEY, // This is the default and can be omitted
});


export default imagekit