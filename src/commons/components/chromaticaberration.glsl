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
uniform float radius;

void main() {
    vec4 inColor = texture(sourceTexture, sourceUV);
    vec4 mip = texture(sourceTexture, sourceUV, log2(radius));

    outColor = inColor;

    outColor.rgb += radius * dFdx(mip.rgb) * vec3(2, 0, -2);
}


