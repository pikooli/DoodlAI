import { pipeline, RawImage } from "@xenova/transformers";

const classifier = await pipeline("image-classification", 'Xenova/quickdraw-mobilevit-small', { quantized: false });

// const image = await RawImage.read('https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/ml-web-games/skateboard.png');
    
    // const output = await classifier(image.grayscale());
    // console.log(output);

self.addEventListener("message", async (event) => {
    const { action, image } = event.data;
    const data = new Uint8ClampedArray(image.data.length / 4);
    for (let i = 0; i < data.length; ++i) {
        data[i] = image.data[i * 4 + 3];
    }
    const img = new RawImage(data, image.width, image.height, 1);
    const result = await classifier(img);
    self.postMessage(result);
});