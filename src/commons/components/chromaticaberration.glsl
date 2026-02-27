#version 300 es
precision highp float;

in vec2 screenUV;
in vec2 sourceUV;
in vec2 destinationUV;

out vec4 outColor;

uniform float time;
uniform float deltaTime;
uniform float framerate;
uniform int frame;
uniform vec2 resolution;
uniform sampler2D sourceTexture;
uniform sampler2D destinationTexture;
uniform mat4 sourceMatrix;
uniform mat4 destinationMatrix;

uniform vec2 redOffset;
uniform vec2 greenOffset;
uniform vec2 blueOffset;

void main() {
    vec2 size = vec2(textureSize(sourceTexture, 0));
    vec2 pxSize = 1.0 / size;

    float r = texture(sourceTexture, sourceUV + redOffset * pxSize).r;
    float g = texture(sourceTexture, sourceUV + greenOffset * pxSize).g;
    float b = texture(sourceTexture, sourceUV + blueOffset * pxSize).b;
    float a = texture(sourceTexture, sourceUV).a;

    outColor = vec4(r, g, b, a);
}
