// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    // for (let i = 0; i < msg.count; i++) {
    //   const frame = figma.createFrame();
    //   frame.resize(500, 1000);
    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //   figma.currentPage.appendChild(frame);
    //   nodes.push(frame);
    // }

    const igSize = {
      x: 415,
      y: 515
    }
    const fbSize = {
      x: 720,
      y: 480
    }
    
    // set the stage and all its content
    const stageFrame = figma.createFrame();
    stageFrame.resize(igSize.x, igSize.y);    
    stageFrame.name="Content Stage"

    const gradient = figma.createRectangle();
    gradient.resize(igSize.x * 2, igSize.y * 2);
    gradient.x = -1 * (igSize.x / 2);
    gradient.y = -1 * (igSize.y / 2);
    gradient.constrainProportions = true;
    gradient.layoutAlign = "STRETCH";

    // gradient.constraints.horizontal = 'SCALE';
    // gradient.constraints.vertical = 'SCALE';
    gradient.fills = [{
      type: 'GRADIENT_RADIAL', 
      gradientTransform: [[0, 1, 0], [-1, 0, 1]], 
      gradientStops: [
        {position: 0.5, color: {r: 1, g: 1, b: 1, a: 1}},
        {position: 1, color: {r: 0.77, g: 0.77, b: 0.77, a: 0.65}}
      ]
    }]

    const wideGrad = gradient.clone();
    gradient.locked = true; 
    stageFrame.appendChild(gradient)
    figma.currentPage.appendChild(stageFrame);

    // all instances
    // const instance = gradientComponent.createInstance();

    // create ig frame
    const igFrame = figma.createFrame();
    igFrame.name='ig-post' ;
    igFrame.resize(igSize.x, igSize.y);
    igFrame.x = -300;
    igFrame.y = 700;
    igFrame.appendChild(gradient.clone());
    
    
    // create facebook/linkedin frame
    const fbLiFrame = figma.createFrame();
    fbLiFrame.name='fb-li-post' ;
    wideGrad.resize(fbSize.x * 2, fbSize.y *2);
    wideGrad.x = -1 * (fbSize.x / 2);
    wideGrad.y = -1 * (fbSize.y / 2);
    fbLiFrame.appendChild(wideGrad);
    fbLiFrame.resize(fbSize.x, fbSize.y);
    fbLiFrame.x = 300;
    fbLiFrame.y = 700
    figma.currentPage.appendChild(fbLiFrame);


    nodes.push(igFrame, fbLiFrame);

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
