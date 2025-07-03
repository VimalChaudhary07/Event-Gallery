class EventGallery {
  constructor() {
    this.galleryContainer = document.getElementById('gallery-container');
    this.loadingElement = document.getElementById('loading');
    this.noPhotosElement = document.getElementById('no-photos');
    this.images = [];
    this.imageObserver = null;
    this.loadedImages = 0;
    
    this.init();
  }

  async init() {
    await this.loadImages();
    this.setupLazyLoading();
    this.setupImageClickHandlers();
    this.setupScrollAnimations();
  }

  async loadImages() {
    try {
      // Load images from predefined list - using actual files from your project
      this.images = this.getImageList();
      this.renderImages();
    } catch (error) {
      console.error('Error loading images:', error);
      this.showNoPhotos();
    }
  }

  getImageList() {
    // Using actual image files from your project for testing
    return [
      'images/0362e3571b4c44a2856ba991833164c4.jpg',
      'images/13b68495e0804e2792cbbb1a3d7d6ee2.jpg',
      'images/2027f34e71454cf18ae424b838c59665.jpg',
      'images/28e5a36eb3894a0b98264ce6f8316035.jpg',
      'images/2ee89ad876dc44b185668b6347a62863.jpg',
      'images/345c219b31524992a877b66e47b1c3e8.jpg',
      'images/55936e4637cb4ab58b030710487cbb40.jpg',
      'images/6a1f26f95fc34f6f970e35a859d4fde9.jpg',
      'images/75cdb64661a24743ad39da9d9731c3f5.jpg',
      'images/7f4f56c4f717459b893af9f71a673cd7.jpg',
      'images/85df09d26ef742548caab16ca6a1d6d8.jpg',
      'images/8cc3727cbe354ba2b3cc344144cbe315.jpg',
      'images/IMG-20231019-WA0003.jpg',
      'images/IMG-20231021-WA0000.jpg',
      'images/IMG-20231028-WA0032.jpg',
      'images/IMG-20231028-WA0034.jpg',
      'images/IMG-20231028-WA0035.jpg',
      'images/IMG-20231028-WA0036.jpg',
      'images/IMG-20231028-WA0037.jpg',
      'images/IMG-20231028-WA0038.jpg',
      'images/IMG-20231028-WA0040.jpg',
      'images/IMG-20231028-WA0041.jpg',
      'images/IMG-20231028-WA0042.jpg',
      'images/IMG-20231028-WA0043.jpg',
      'images/IMG-20231028-WA0044.jpg',
      'images/IMG-20231028-WA0045.jpg',
      'images/IMG-20231028-WA0046.jpg',
      'images/IMG-20231028-WA0047.jpg',
      'images/IMG-20231028-WA0051.jpg',
      'images/IMG-20231028-WA0052.jpg',
      'images/IMG-20231028-WA0053.jpg',
      'images/IMG-20231028-WA0054.jpg',
      'images/IMG-20240106-WA0024.jpg',
      'images/IMG-20240106-WA0027.jpg',
      'images/IMG-20240106-WA0028.jpg',
      'images/IMG-20240106-WA0029.jpg',
      'images/IMG-20240106-WA0030.jpg',
      'images/IMG-20240315-WA0005.jpg',
      'images/IMG-20240315-WA0007.jpg',
      'images/IMG-20240315-WA0012.jpg',
      'images/IMG-20240315-WA0013.jpg',
      'images/IMG-20240315-WA0014.jpg',
      'images/IMG-20240315-WA0015.jpg',
      'images/IMG-20240315-WA0018.jpg',
      'images/IMG-20240315-WA0019.jpg',
      'images/IMG-20240315-WA0023.jpg',
      'images/IMG-20240315-WA0024.jpg',
      'images/IMG-20240315-WA0025.jpg',
      'images/IMG-20240315-WA0026.jpg',
      'images/IMG-20240315-WA0027.jpg',
      'images/IMG-20240315-WA0028.jpg',
      'images/IMG-20240315-WA0029.jpg',
      'images/IMG-20240315-WA0030.jpg',
      'images/IMG-20240315-WA0031.jpg',
      'images/IMG-20240315-WA0032.jpg',
      'images/IMG-20240315-WA0033.jpg',
      'images/IMG-20240521-WA0032.jpg',
      'images/IMG-20240521-WA0033.jpg',
      'images/IMG-20240521-WA0034.jpg',
      'images/IMG-20240521-WA0035.jpg',
      'images/IMG-20240521-WA0036.jpg',
      'images/IMG-20240530-WA0028.jpg',
      'images/IMG-20240611-WA0006.jpg',
      'images/IMG-20240611-WA0007.jpg',
      'images/IMG-20240619-WA0068.jpg',
      'images/IMG-20240619-WA0069.jpg',
      'images/IMG-20240619-WA0070.jpg',
      'images/IMG-20240620-WA0001.jpg',
      'images/IMG-20240620-WA0002.jpg',
      'images/IMG-20240620-WA0003.jpg',
      'images/IMG-20240620-WA0004.jpg',
      'images/IMG-20240620-WA0005.jpg',
      'images/IMG-20240620-WA0006.jpg',
      'images/IMG-20240620-WA0007.jpg',
      'images/IMG-20240620-WA0008.jpg',
      'images/IMG-20240620-WA0009.jpg',
      'images/IMG-20240620-WA0010.jpg',
      'images/IMG-20240620-WA0011.jpg',
      'images/IMG-20240620-WA0024.jpg',
      'images/IMG-20240620-WA0025.jpg',
      'images/IMG-20240620-WA0026.jpg',
      'images/IMG-20240620-WA0027.jpg',
      'images/IMG-20240620-WA0028.jpg',
      'images/IMG-20240620-WA0029.jpg',
      'images/IMG-20240803-WA0021.jpg',
      'images/IMG-20240803-WA0022.jpg',
      'images/IMG-20240803-WA0023.jpg',
      'images/IMG-20240803-WA0024.jpg',
      'images/IMG-20240803-WA0025.jpg',
      'images/IMG-20240901-WA0055.jpg',
      'images/IMG-20240901-WA0056.jpg',
      'images/IMG-20240901-WA0057.jpg',
      'images/IMG-20240909-WA0003.jpg',
      'images/IMG-20240909-WA0005.jpg',
      'images/IMG-20240909-WA0006.jpg',
      'images/IMG-20240909-WA0007.jpg',
      'images/IMG-20240909-WA0008.jpg',
      'images/IMG-20240913-WA0008.jpg',
      'images/IMG-20240913-WA0009.jpg',
      'images/IMG-20240913-WA0010.jpg',
      'images/IMG-20240913-WA0011.jpg',
      'images/IMG-20240913-WA0012.jpg',
      'images/IMG-20240913-WA0013.jpg',
      'images/IMG-20240913-WA0014.jpg',
      'images/IMG-20240913-WA0015.jpg',
      'images/IMG-20240913-WA0016.jpg',
      'images/IMG-20240913-WA0017.jpg',
      'images/IMG-20240913-WA0025.jpg',
      'images/IMG_20230708_174028.jpg',
      'images/IMG_20230708_174259.jpg',
      'images/IMG_20230708_174441.jpg',
      'images/IMG_20230708_174542.jpg',
      'images/IMG_20230709_131532.jpg',
      'images/IMG_20230709_131655.jpg',
      'images/IMG_20230709_131751.jpg',
      'images/IMG_20230709_132051.jpg',
      'images/IMG_20230709_132159.jpg',
      'images/IMG_20230709_132300.jpg',
      'images/IMG_20230709_132435.jpg',
      'images/IMG_20230709_132526.jpg',
      'images/IMG_20230709_133412.jpg',
      'images/IMG_20230709_133558.jpg',
      'images/IMG_20230709_133713.jpg',
      'images/IMG_20230709_133937.jpg',
      'images/IMG_20230709_134100.jpg',
      'images/IMG_20230709_134208.jpg',
      'images/IMG_20230709_134324.jpg',
      'images/IMG_20230709_134600.jpg',
      'images/IMG_20230709_134713.jpg',
      'images/IMG_20230709_134821.jpg',
      'images/IMG_20230709_134950.jpg',
      'images/IMG_20230709_135111.jpg',
      'images/IMG_20230709_135243.jpg',
      'images/IMG_20230711_175206.jpg',
      'images/IMG_20230711_175309.jpg',
      'images/IMG_20230711_175453.jpg',
      'images/IMG_20230711_175534.jpg',
      'images/IMG_20230711_175626.jpg',
      'images/IMG_20230712_155613.jpg',
      'images/IMG_20230712_155641.jpg',
      'images/IMG_20230712_155707.jpg',
      'images/IMG_20230712_155728.jpg',
      'images/IMG_20230712_155755.jpg',
      'images/IMG_20230712_155815.jpg',
      'images/IMG_20230712_155940.jpg',
      'images/IMG_20230712_160015.jpg',
      'images/IMG_20230712_160027.jpg',
      'images/IMG_20230712_160041.jpg',
      'images/IMG_20230712_160113.jpg',
      'images/IMG_20230712_160128.jpg',
      'images/IMG_20230712_160143.jpg',
      'images/IMG_20230712_160157.jpg',
      'images/IMG_20230712_160255.jpg',
      'images/IMG_20230712_160331.jpg',
      'images/IMG_20230712_160407.jpg',
      'images/IMG_20230712_160431.jpg',
      'images/IMG_20230712_160531.jpg',
      'images/IMG_20230712_161557.jpg',
      'images/IMG_20230712_161617.jpg',
      'images/IMG_20230712_161635.jpg',
      'images/IMG_20230712_161656.jpg',
      'images/IMG_20230712_161715.jpg',
      'images/IMG_20230712_161742.jpg',
      'images/IMG_20230712_162006.jpg',
      'images/IMG_20230712_162026.jpg',
      'images/IMG_20230712_162127.jpg',
      'images/IMG_20230712_162146.jpg',
      'images/IMG_20230712_162224.jpg',
      'images/IMG_20230712_162245.jpg',
      'images/IMG_20230712_162303.jpg',
      'images/IMG_20230712_162321.jpg',
      'images/IMG_20230712_162336.jpg',
      'images/IMG_20230712_162353.jpg',
      'images/IMG_20230712_162418.jpg',
      'images/IMG_20230712_162527.jpg',
      'images/IMG_20230712_162556.jpg',
      'images/IMG_20230712_162614.jpg',
      'images/IMG_20230712_162628.jpg',
      'images/IMG_20230712_162645.jpg',
      'images/IMG_20230712_162708.jpg',
      'images/IMG_20230712_162729.jpg',
      'images/IMG_20230712_162817.jpg',
      'images/IMG_20230712_162833.jpg',
      'images/IMG_20230712_162910.jpg',
      'images/IMG_20230712_162925.jpg',
      'images/IMG_20230712_162941.jpg',
      'images/IMG_20230712_162956.jpg',
      'images/IMG_20230712_163030.jpg',
      'images/IMG_20230712_163049.jpg',
      'images/IMG_20230712_163103.jpg',
      'images/IMG_20230712_163116.jpg',
      'images/IMG_20230712_163130.jpg',
      'images/IMG_20230712_163150.jpg',
      'images/IMG_20230712_163250.jpg',
      'images/IMG_20230712_163611.jpg',
      'images/IMG_20230712_163630.jpg',
      'images/IMG_20230712_163647.jpg',
      'images/IMG_20230712_163704.jpg',
      'images/IMG_20230712_165946.jpg',
      'images/IMG_20230712_165957.jpg',
      'images/IMG_20230712_170010.jpg',
      'images/IMG_20230712_170024.jpg',
      'images/IMG_20230712_170040.jpg',
      'images/IMG_20230712_170059.jpg',
      'images/IMG_20230712_170115.jpg',
      'images/IMG_20230712_170138.jpg',
      'images/IMG_20230712_170151.jpg',
      'images/IMG_20230712_170206.jpg',
      'images/IMG_20230712_170218.jpg',
      'images/IMG_20230712_170230.jpg',
      'images/IMG_20230712_170248.jpg',
      'images/IMG_20230712_170302.jpg',
      'images/IMG_20230712_170317.jpg',
      'images/IMG_20230712_170358.jpg',
      'images/IMG_20230712_170412.jpg',
      'images/IMG_20230712_170423.jpg',
      'images/IMG_20230712_170438.jpg',
      'images/IMG_20230712_170451.jpg',
      'images/IMG_20230712_170503.jpg',
      'images/IMG_20230712_170530.jpg',
      'images/IMG_20230712_170600.jpg',
      'images/IMG_20230712_170616.jpg',
      'images/IMG_20230712_170644.jpg',
      'images/IMG_20230712_170657.jpg',
      'images/IMG_20230712_170712.jpg',
      'images/IMG_20230712_170728.jpg',
      'images/IMG_20230712_170750.jpg',
      'images/IMG_20230712_170804.jpg',
      'images/IMG_20230712_170817.jpg',
      'images/IMG_20230712_170830.jpg',
      'images/IMG_20230712_170843.jpg',
      'images/IMG_20230712_170859.jpg',
      'images/IMG_20230712_170926.jpg',
      'images/IMG_20230712_171004.jpg',
      'images/IMG_20230712_171017.jpg',
      'images/IMG_20230712_171030.jpg',
      'images/IMG_20230712_171054.jpg',
      'images/IMG_20230712_171105.jpg',
      'images/IMG_20230712_171117.jpg',
      'images/IMG_20230712_171128.jpg',
      'images/IMG_20230712_171158.jpg',
      'images/IMG_20230712_171212.jpg',
      'images/IMG_20230712_171232.jpg',
      'images/IMG_20230712_171256.jpg',
      'images/IMG_20230712_171316.jpg',
      'images/IMG_20230712_171414.jpg',
      'images/IMG_20230712_171435.jpg',
      'images/IMG_20230712_171458.jpg',
      'images/IMG_20230712_171520.jpg',
      'images/IMG_20230712_171534.jpg',
      'images/IMG_20230712_171552.jpg',
      'images/IMG_20230712_171614.jpg',
      'images/IMG_20230712_171647.jpg',
      'images/IMG_20230712_171702.jpg',
      'images/IMG_20230712_171720.jpg',
      'images/IMG_20230712_171734.jpg',
      'images/IMG_20230712_171748.jpg',
      'images/IMG_20230712_171825.jpg',
      'images/IMG_20230712_171838.jpg',
      'images/IMG_20230712_171850.jpg',
      'images/IMG_20230712_171907.jpg',
      'images/IMG_20230712_171922.jpg',
      'images/IMG_20230712_171945.jpg',
      'images/IMG_20230712_171958.jpg',
      'images/IMG_20230712_172021.jpg',
      'images/IMG_20230712_172051.jpg',
      'images/IMG_20230712_172111.jpg',
      'images/IMG_20230712_193051.jpg',
      'images/IMG_20230712_193108.jpg',
      'images/IMG_20230712_193123.jpg',
      'images/IMG_20230712_193302.jpg',
      'images/IMG_20230712_193321.jpg',
      'images/IMG_20230712_193338.jpg',
      'images/IMG_20230712_193358.jpg',
      'images/IMG_20230712_193434.jpg',
      'images/IMG_20230712_193451.jpg',
      'images/IMG_20230712_193616.jpg',
      'images/IMG_20230712_193631.jpg',
      'images/IMG_20230712_193719.jpg',
      'images/IMG_20231018_135019.jpg',
      'images/IMG_20231018_135045.jpg',
      'images/IMG_20231018_135108.jpg',
      'images/IMG_20231018_135137.jpg',
      'images/IMG_20231018_135237.jpg',
      'images/IMG_20231018_135306.jpg',
      'images/IMG_20231018_135405.jpg',
      'images/IMG_20231018_135424.jpg',
      'images/IMG_20231018_135441.jpg',
      'images/IMG_20231018_135459.jpg',
      'images/IMG_20231018_135629.jpg',
      'images/IMG_20231018_135709.jpg',
      'images/IMG_20231018_135723.jpg',
      'images/IMG_20231018_135850.jpg',
      'images/IMG_20231018_135916.jpg',
      'images/IMG_20231018_135928.jpg',
      'images/IMG_20231018_135942.jpg',
      'images/IMG_20231018_140116.jpg',
      'images/IMG_20231018_140133.jpg',
      'images/IMG_20231018_140153.jpg',
      'images/IMG_20231018_140207.jpg',
      'images/IMG_20231018_140220.jpg',
      'images/IMG_20231018_140237.jpg',
      'images/IMG_20231018_140251.jpg',
      'images/IMG_20231018_140308.jpg',
      'images/IMG_20231018_140324.jpg',
      'images/IMG_20231018_140339.jpg',
      'images/IMG_20231018_140355.jpg',
      'images/IMG_20231018_140408.jpg',
      'images/IMG_20231018_140421.jpg',
      'images/IMG_20231018_140433.jpg',
      'images/IMG_20231018_140448.jpg',
      'images/IMG_20231018_140502.jpg',
      'images/IMG_20231018_142551.jpg',
      'images/IMG_20231018_142605.jpg',
      'images/IMG_20231018_142815.jpg',
      'images/IMG_20231018_142826.jpg',
      'images/IMG_20231018_142836.jpg',
      'images/IMG_20231018_142900.jpg',
      'images/IMG_20231018_142914.jpg',
      'images/IMG_20231018_142929.jpg',
      'images/IMG_20231018_142953.jpg',
      'images/IMG_20231018_143040.jpg',
      'images/IMG_20231020_194507.jpg',
      'images/IMG_20231022_150333.jpg',
      'images/IMG_20231022_150359.jpg',
      'images/IMG_20231022_150435.jpg',
      'images/IMG_20231022_150454.jpg',
      'images/IMG_20231022_150513.jpg',
      'images/IMG_20231022_150534.jpg',
      'images/IMG_20231022_150557.jpg',
      'images/IMG_20231022_150623.jpg',
      'images/IMG_20231022_150659.jpg',
      'images/IMG_20231022_150749.jpg',
      'images/IMG_20231022_150815.jpg',
      'images/IMG_20231022_150832.jpg',
      'images/IMG_20231022_150903.jpg',
      'images/IMG_20231126_135350.jpg',
      'images/IMG_20240126_161235.jpg',
      'images/IMG_20240126_161300.jpg',
      'images/IMG_20240126_161328.jpg',
      'images/IMG_20240126_161354.jpg',
      'images/IMG_20240126_161415.jpg',
      'images/IMG_20240126_161445.jpg',
      'images/IMG_20240126_161535.jpg',
      'images/IMG_20240126_161555.jpg',
      'images/IMG_20240126_161623.jpg',
      'images/IMG_20240126_161646.jpg',
      'images/IMG_20240126_161712.jpg',
      'images/IMG_20240126_161732.jpg',
      'images/IMG_20240126_161806.jpg',
      'images/IMG_20240126_161831.jpg',
      'images/IMG_20240126_161847.jpg',
      'images/IMG_20240201_190018.jpg',
      'images/IMG_20250221_220418.jpg',
      'images/IMG_20250221_220454.jpg',
      'images/IMG_20250221_220525.jpg',
      'images/IMG_20250221_220542.jpg',
      'images/IMG_20250221_220609.jpg',
      'images/IMG_20250221_220643.jpg',
      'images/IMG_20250221_221751.jpg',
      'images/IMG_20250221_221807.jpg',
      'images/IMG_20250221_221820.jpg',
      'images/IMG_20250221_221835.jpg',
      'images/IMG_20250221_221852.jpg',
      'images/IMG_20250221_221906.jpg',
      'images/IMG_20250221_221917.jpg',
      'images/IMG_20250221_221926.jpg',
      'images/IMG_20250221_221941.jpg',
      'images/IMG_20250221_221952.jpg',
      'images/IMG_20250221_222003.jpg',
      'images/IMG_20250221_222015.jpg',
      'images/IMG_20250221_222026.jpg',
      'images/IMG_20250221_222035.jpg',
      'images/IMG_20250221_222045.jpg',
      'images/IMG_20250221_222055.jpg',
      'images/IMG_20250221_222107.jpg',
      'images/IMG_20250221_222116.jpg',
      'images/IMG_20250221_222128.jpg',
      'images/IMG_20250221_222140.jpg',
      'images/IMG_20250221_222151.jpg',
      'images/IMG_20250221_222201.jpg',
      'images/IMG_20250221_222210.jpg',
      'images/IMG_20250221_222221.jpg',
      'images/IMG_20250221_222233.jpg',
      'images/IMG_20250221_222248.jpg',
      'images/IMG_20250221_222304.jpg',
      'images/IMG_20250221_222337.jpg',
      'images/IMG_20250221_222347.jpg',
      'images/IMG_20250221_222359.jpg',
      'images/IMG_20250221_222418.jpg',
      'images/IMG_20250221_222427.jpg',
      'images/IMG_20250221_222438.jpg',
      'images/IMG_20250221_223240.jpg',
      'images/IMG_20250221_223252.jpg',
      'images/IMG_20250221_223303.jpg',
      'images/IMG_20250221_223324.jpg',
      'images/IMG_20250221_223333.jpg',
      'images/IMG_20250221_223350.jpg',
      'images/IMG_20250221_223402.jpg',
      'images/IMG_20250221_223422.jpg',
      'images/IMG_20250221_223432.jpg',
      'images/IMG_20250221_223453.jpg',
      'images/IMG_20250221_223502.jpg',
      'images/IMG_20250221_223512.jpg',
      'images/IMG_20250221_223524.jpg',
      'images/IMG_20250221_223543.jpg',
      'images/IMG_20250221_223554.jpg',
      'images/IMG_20250221_223603.jpg',
      'images/IMG_20250221_223613.jpg',
      'images/IMG_20250221_223624.jpg',
      'images/IMG_20250221_223637.jpg',
      'images/IMG_20250221_223647.jpg',
      'images/WhatsApp Image 2024-02-16 at 2.42.26 PM.jpeg',
      'images/WhatsApp Image 2024-02-16 at 2.42.43 PM.jpeg',
      'images/WhatsApp Image 2024-02-16 at 2.42.52 PM.jpeg',
      'images/WhatsApp Image 2024-02-16 at 2.43.02 PM.jpeg',
      'images/WhatsApp Image 2024-02-16 at 2.43.14 PM.jpeg',
      'images/WhatsApp Image 2024-02-16 at 2.43.25 PM.jpeg',
      'images/WhatsApp Image 2024-02-16 at 2.43.54 PM.jpeg',
      'images/WhatsApp Image 2024-02-16 at 2.44.02 PM.jpeg',
      'images/WhatsApp Image 2024-08-26 at 3.41.28 PM (2).jpeg',
      'images/WhatsApp Image 2024-08-26 at 3.41.28 PM.jpeg',
      'images/WhatsApp Image 2024-08-26 at 3.41.29 PM.jpeg',
      'images/WhatsApp Image 2024-08-31 at 11.31.15 PM.jpeg',
      'images/WhatsApp Image 2024-08-31 at 11.31.16 PM (1).jpeg',
      'images/WhatsApp Image 2024-08-31 at 11.31.16 PM (2).jpeg',
      'images/WhatsApp Image 2024-08-31 at 11.31.16 PM (3).jpeg',
      'images/WhatsApp Image 2024-08-31 at 11.31.16 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.08 PM (1).jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.08 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.09 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.10 PM (1).jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.10 PM (2).jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.10 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.11 PM (1).jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.11 PM (2).jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.11 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.12 PM (1).jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.12 PM (2).jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.12 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.13 PM (1).jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.13 PM (2).jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.13 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 1.49.14 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 10.03.14 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 10.03.18 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.51 PM (1).jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.51 PM (2).jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.51 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.52 PM (1).jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.52 PM (2).jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.52 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.53 PM (1).jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.53 PM (2).jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.53 PM (3).jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.53 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.54 PM (1).jpeg',
      'images/WhatsApp Image 2024-09-01 at 12.25.54 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 5.00.17 PM (1).jpeg',
      'images/WhatsApp Image 2024-09-01 at 5.00.17 PM (2).jpeg',
      'images/WhatsApp Image 2024-09-01 at 5.00.17 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 5.00.18 PM.jpeg',
      'images/WhatsApp Image 2024-09-01 at 5.00.19 PM (2).jpeg',
      'images/b7e5d0b643a34fd8b648e4fe73a4f311.jpg',
      'images/c15c7fede06b4770a36907554837acee.jpg',
      'images/c79ffa9f07e044f6b701058fef2dce1a.jpg',
      'images/e120d494497840cb836d2ebafe7fdf90.jpg',
      'images/f40a7ef454ac450fa30bd10e177830b8.jpg'
    ];
  }

  renderImages() {
    if (this.images.length === 0) {
      this.showNoPhotos();
      return;
    }

    this.loadingElement.style.display = 'none';
    
    // Create gallery items for all images
    this.images.forEach((imageSrc, index) => {
      const galleryItem = this.createGalleryItem(imageSrc, index);
      this.galleryContainer.appendChild(galleryItem);
    });
  }

  createGalleryItem(imageSrc, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View event photo ${index + 1}`);

    const img = document.createElement('img');
    img.setAttribute('data-src', imageSrc);
    img.setAttribute('alt', `Event photo ${index + 1}`);
    img.className = 'gallery-image loading';
    img.loading = 'lazy';
    
    item.appendChild(img);
    return item;
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            this.imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '100px 0px',
        threshold: 0.01
      });

      // Observe all images
      const images = this.galleryContainer.querySelectorAll('img[data-src]');
      images.forEach(img => this.imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      const images = this.galleryContainer.querySelectorAll('img[data-src]');
      images.forEach(img => this.loadImage(img));
    }
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    
    // Create a new image to preload
    const newImg = new Image();
    
    newImg.onload = () => {
      img.src = src;
      img.classList.remove('loading');
      img.classList.add('loaded');
      this.loadedImages++;
      
      // Trigger animation
      requestAnimationFrame(() => {
        const item = img.closest('.gallery-item');
        if (item) {
          item.classList.add('animate-in');
        }
      });
    };
    
    newImg.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      img.classList.remove('loading');
      img.classList.add('error');
      img.alt = 'Failed to load image';
      
      // Show placeholder or hide the item
      const item = img.closest('.gallery-item');
      if (item) {
        item.style.opacity = '0.5';
        item.style.pointerEvents = 'none';
      }
    };
    
    // Start loading the image
    newImg.src = src;
    img.removeAttribute('data-src');
  }

  setupImageClickHandlers() {
    this.galleryContainer.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('.gallery-item');
      if (galleryItem) {
        const img = galleryItem.querySelector('img');
        if (img && img.src && !img.classList.contains('loading') && !img.classList.contains('error')) {
          this.openImageModal(img.src, img.alt);
        }
      }
    });

    // Handle keyboard navigation
    this.galleryContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
          galleryItem.click();
        }
      }
    });
  }

  setupScrollAnimations() {
    // Simple fade-in animation for gallery items
    const items = this.galleryContainer.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.05}s`;
    });
  }

  openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close" aria-label="Close modal">&times;</button>
          <img src="${src}" alt="${alt}" class="modal-image">
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Trigger animation
    requestAnimationFrame(() => {
      modal.classList.add('show');
    });

    // Close modal handlers
    const closeModal = () => {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (document.body.contains(modal)) {
          document.body.removeChild(modal);
        }
      }, 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.className === 'modal-overlay') {
        closeModal();
      }
    });

    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Prevent modal from closing when clicking on image
    modal.querySelector('.modal-image').addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  showNoPhotos() {
    this.loadingElement.style.display = 'none';
    this.noPhotosElement.style.display = 'block';
  }
}

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new EventGallery();
});

// Optimized navbar scroll effect
let lastScrollTop = 0;
let ticking = false;
const navbar = document.querySelector('.navbar');

function updateNavbar() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}, { passive: true });
