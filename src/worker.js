import { pipeline, RawImage } from '@xenova/transformers';

let classifier;

(async () => {
  self.postMessage({ type: 'status', status: 'loading' });
  classifier = await pipeline(
    'image-classification',
    'Xenova/quickdraw-mobilevit-small',
    { quantized: false }
  );
  self.postMessage({ type: 'status', status: 'ready' });
  console.log('Pipeline initialized');
})();

self.addEventListener('message', async (event) => {
  while (!classifier) {
    await new Promise((resolve) => setTimeout(resolve, 50)); // Wait until classifier is ready
  }

  const { image } = event.data;
  const data = new Uint8ClampedArray(image.data.length / 4);
  for (let i = 0; i < data.length; ++i) {
    data[i] = image.data[i * 4 + 3];
  }
  const img = new RawImage(data, image.width, image.height, 1);
  const result = await classifier(img);
  self.postMessage({ type: "result", result });
});
