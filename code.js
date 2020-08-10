var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// basic user params
const igSize = {
    x: 415,
    y: 515,
};
const fbSize = {
    x: 720,
    y: 480,
};
const nodes = [];
// set the scene
let stageFrame = figma.createFrame(), igFrame = figma.createFrame(), fbLiFrame = figma.createFrame(), gradient = figma.createRectangle(), title = figma.createText(), titleComponent = figma.createComponent();
const mainPage = figma.currentPage;
// set the stage and all its content
let setStage = () => __awaiter(this, void 0, void 0, function* () {
    stageFrame.resize(igSize.x, igSize.y);
    stageFrame.name = "Content Stage";
});
let createGradients = () => __awaiter(this, void 0, void 0, function* () {
    gradient.resize(igSize.x * 2, igSize.y * 2);
    gradient.x = -1 * (igSize.x / 2);
    gradient.y = -1 * (igSize.y / 2);
    gradient.constrainProportions = true;
    gradient.layoutAlign = "STRETCH";
    gradient.fills = [
        {
            type: "GRADIENT_RADIAL",
            gradientTransform: [
                [0, 1, 0],
                [-1, 0, 1],
            ],
            gradientStops: [
                { position: 0.5, color: { r: 0.94, g: 0.94, b: 0.94, a: 1 } },
                { position: 1, color: { r: 0.77, g: 0.77, b: 0.77, a: 0.85 } },
            ],
        },
    ];
    gradient.locked = true;
});
let calculateFontSize = (len) => {
    let max = 40;
    let min = 24;
    let fontSize;
    let calculatedSize = Math.floor(2830 / len);
    if (calculatedSize >= max) {
        fontSize = max;
    }
    else if (calculatedSize <= min) {
        fontSize = min;
    }
    else {
        fontSize = calculatedSize;
    }
    return fontSize;
};
let writeText = () => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    title.fontName = { family: "Roboto", style: "Regular" };
    title.fills = [
        {
            type: "SOLID",
            color: {
                r: 0.1254901961,
                g: 0.3921568627,
                b: 0.6862745098,
            },
        },
    ];
    title.textAlignHorizontal = "CENTER";
    title.textAlignVertical = "CENTER";
    title.characters =
        "Hey there! asd fasdf asdf asdf ksdf asdfa s asda asdf asdfdfsdadf ";
    let titleLength = title.characters.length;
    // console.log(calculateFontSize(titleLength));
    title.fontSize = calculateFontSize(titleLength);
    title.textAutoResize = "WIDTH_AND_HEIGHT";
    nodes.push(title);
    figma.currentPage.selection = nodes;
    let titleGroup = figma.group(figma.currentPage.selection, mainPage);
    titleGroup.name = "grp-title";
    titleGroup.resize(igSize.x - 60, igSize.y - 150);
    titleComponent.name = "component-title";
    titleComponent.layoutAlign = "STRETCH";
    titleComponent.appendChild(titleGroup);
    titleComponent.resize(igSize.x - 60, igSize.y - 150);
    stageFrame.appendChild(titleComponent);
    title.x = igSize.x / 2 - title.width / 2;
    title.y = igSize.y / 2 - title.height / 2;
});
// console.log(title.fontName);
// title.fontName = 'Arial';
stageFrame.appendChild(gradient);
figma.currentPage.appendChild(stageFrame);
// all instances
let setFrames = () => __awaiter(this, void 0, void 0, function* () {
    let igTextInstance = titleComponent.createInstance();
    let fbTextInstance = titleComponent.createInstance();
    fbTextInstance.resize(fbSize.x / 2, fbSize.y);
    fbTextInstance.x = fbTextInstance.width / 2 - 30;
    fbTextInstance.y = -30;
    // create ig frame
    igFrame.name = "ig-post";
    igFrame.resize(igSize.x, igSize.y);
    igFrame.x = -300;
    igFrame.y = 700;
    igFrame.appendChild(gradient.clone());
    igFrame.appendChild(igTextInstance);
    // create facebook/linkedin frame
    fbLiFrame.name = "fb-li-post";
    const wideGrad = gradient.clone();
    wideGrad.locked = true;
    wideGrad.resize(fbSize.x * 2, fbSize.y * 2);
    wideGrad.x = -1 * (fbSize.x / 2);
    wideGrad.y = -1 * (fbSize.y / 2);
    fbLiFrame.appendChild(wideGrad);
    fbLiFrame.appendChild(fbTextInstance);
    fbLiFrame.resize(fbSize.x, fbSize.y);
    fbLiFrame.x = 300;
    fbLiFrame.y = 700;
    figma.currentPage.appendChild(fbLiFrame);
});
let run = () => __awaiter(this, void 0, void 0, function* () {
    setStage();
    createGradients();
    setFrames();
    writeText();
    figma.notify("Post created 👍");
    figma.closePlugin();
});
run();
