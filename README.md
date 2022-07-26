# WebGL-and-3D-Transformations-and-Viewing
 _Computer Graphics WebGL_

In this assignment you will practice 3D Transformations, camera control and perspective projection. There are mainly 4 parts.

1. Update the shapes: You already have your initials from assignment 3. Now rotate your second initial so that it is on YZ plane. Also add a square below initials. This square won’t be affected from transformations and color changes.

2. 3D transformations: Update transformations so you will have 3D ones instead of 2D.

3. Camera control: Camera position and target (where camera looks at) will be controlled as well as field of view of the camera.

4. Perspective projection: Implement perspective projection

## _How to Do_

1) Draw a 4 by 4 square below your initials. (At height -2, one corner should be at (-2, -2, -2) and the opposite corner needs to be at (2, -2, 2).) This square shouldn’t be affected when you transform the initials, or when you change the color. (Fixed color, fixed position)

2) Update Initials: You need to update your initials from Assignment 3 so that your second initial is oriented towards z dimension.

3) Camera control and perspective projection: As you would remember from the lecture, you need to have modelMatrix, viewMatrix, and projectionMatrix.
modelMatrix is used to transform the objects and you already have it from assignment 3.
viewMatrix defines external camera parameters. You need to control the camera with camera position, and camera target (where camera looks at). For that you can use the lookAt(eye,target,up); function from MV.js.
projectionMatrix determines the internal camera parameters (FOVY, aspect ratio etc.). In order to generate perspective projection matrix you can use the perspective method from MV.js (perspective(fovy, aspect, near, far);). FOVY can be controlled from GUI and initially you may set it to 45 degrees. Set aspect ratio to 1 and give suitable values for near and far (range of visible depth).

4) Vertex shader: Your vertex shader (in HTML file) needs to get modelMatrix, viewMatrix, and projectionMatrix as uniform variables and use them appropriately. Update the vertex shader so that it makes perspective projection. Check the examples from Ed Angel’s website to get help.

5) Transformations in 3D. Make translation, scale, and rotation in x, y, and z. It is straightforward.

6) Insert gl.enable(gl.DEPTH_TEST); into init method. We will see why.

![ss](https://github.com/flashomer/WebGL-and-3D-Transformations-and-Viewing/blob/main/screenshot/Screenshot.jpg)
