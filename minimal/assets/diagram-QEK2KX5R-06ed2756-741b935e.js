import{x as z,O as l,C as y,G as w,u as S,e as I,a4 as F,aa as E,f as D,I as P,W as R,N as G,Z as W,F as B}from"./index-9ab89410.js";import{m as Z}from"./chunk-4BX2VUAB-b4e41fc7-e69e3a8b.js";import{S as j}from"./mermaid-parser.core-6264bd21-444655e1.js";import"./_baseUniq-aa1cf781-88dabfae.js";import"./_basePickBy-57d45ebd-ca0b6b63.js";import"./clone-181e8389-65fcb847.js";var h={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},b={axes:[],curves:[],options:h},x=structuredClone(b),N=z.radar,V=l(()=>y({...N,...w().radar}),"getConfig"),C=l(()=>x.axes,"getAxes"),_=l(()=>x.curves,"getCurves"),q=l(()=>x.options,"getOptions"),H=l(a=>{x.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),J=l(a=>{x.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:K(t.entries)}))},"setCurves"),K=l(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=C();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(i=>{var n;return((n=i.axis)==null?void 0:n.$refText)===e.name});if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),Q=l(a=>{var t,e,r,i,n;const o=a.reduce((s,c)=>(s[c.name]=c,s),{});x.options={showLegend:((t=o.showLegend)==null?void 0:t.value)??h.showLegend,ticks:((e=o.ticks)==null?void 0:e.value)??h.ticks,max:((r=o.max)==null?void 0:r.value)??h.max,min:((i=o.min)==null?void 0:i.value)??h.min,graticule:((n=o.graticule)==null?void 0:n.value)??h.graticule}},"setOptions"),U=l(()=>{S(),x=structuredClone(b)},"clear"),f={getAxes:C,getCurves:_,getOptions:q,setAxes:H,setCurves:J,setOptions:Q,getConfig:V,clear:U,setAccTitle:D,getAccTitle:P,setDiagramTitle:R,getDiagramTitle:G,getAccDescription:W,setAccDescription:B},X=l(a=>{Z(a,f);const{axes:t,curves:e,options:r}=a;f.setAxes(t),f.setCurves(e),f.setOptions(r)},"populate"),Y={parse:l(async a=>{const t=await j("radar",a);I.debug(t),X(t)},"parse")},tt=l((a,t,e,r)=>{const i=r.db,n=i.getAxes(),o=i.getCurves(),s=i.getOptions(),c=i.getConfig(),d=i.getDiagramTitle(),u=F(t),g=et(u,c),p=s.max??Math.max(...o.map(v=>Math.max(...v.entries))),m=s.min,$=Math.min(c.width,c.height)/2;at(g,n,$,s.ticks,s.graticule),rt(g,n,$,c),M(g,n,o,m,p,s.graticule,c),T(g,o,s.showLegend,c),g.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),et=l((a,t)=>{const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,i={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return a.attr("viewbox",`0 0 ${e} ${r}`).attr("width",e).attr("height",r),a.append("g").attr("transform",`translate(${i.x}, ${i.y})`)},"drawFrame"),at=l((a,t,e,r,i)=>{if(i==="circle")for(let n=0;n<r;n++){const o=e*(n+1)/r;a.append("circle").attr("r",o).attr("class","radarGraticule")}else if(i==="polygon"){const n=t.length;for(let o=0;o<r;o++){const s=e*(o+1)/r,c=t.map((d,u)=>{const g=2*u*Math.PI/n-Math.PI/2,p=s*Math.cos(g),m=s*Math.sin(g);return`${p},${m}`}).join(" ");a.append("polygon").attr("points",c).attr("class","radarGraticule")}}},"drawGraticule"),rt=l((a,t,e,r)=>{const i=t.length;for(let n=0;n<i;n++){const o=t[n].label,s=2*n*Math.PI/i-Math.PI/2;a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*Math.cos(s)).attr("y2",e*r.axisScaleFactor*Math.sin(s)).attr("class","radarAxisLine"),a.append("text").text(o).attr("x",e*r.axisLabelFactor*Math.cos(s)).attr("y",e*r.axisLabelFactor*Math.sin(s)).attr("class","radarAxisLabel")}},"drawAxes");function M(a,t,e,r,i,n,o){const s=t.length,c=Math.min(o.width,o.height)/2;e.forEach((d,u)=>{if(d.entries.length!==s)return;const g=d.entries.map((p,m)=>{const $=2*Math.PI*m/s-Math.PI/2,v=L(p,r,i,c),O=v*Math.cos($),k=v*Math.sin($);return{x:O,y:k}});n==="circle"?a.append("path").attr("d",A(g,o.curveTension)).attr("class",`radarCurve-${u}`):n==="polygon"&&a.append("polygon").attr("points",g.map(p=>`${p.x},${p.y}`).join(" ")).attr("class",`radarCurve-${u}`)})}l(M,"drawCurves");function L(a,t,e,r){const i=Math.min(Math.max(a,t),e);return r*(i-t)/(e-t)}l(L,"relativeRadius");function A(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let i=0;i<e;i++){const n=a[(i-1+e)%e],o=a[i],s=a[(i+1)%e],c=a[(i+2)%e],d={x:o.x+(s.x-n.x)*t,y:o.y+(s.y-n.y)*t},u={x:s.x-(c.x-o.x)*t,y:s.y-(c.y-o.y)*t};r+=` C${d.x},${d.y} ${u.x},${u.y} ${s.x},${s.y}`}return`${r} Z`}l(A,"closedRoundCurve");function T(a,t,e,r){if(!e)return;const i=(r.width/2+r.marginRight)*3/4,n=-(r.height/2+r.marginTop)*3/4,o=20;t.forEach((s,c)=>{const d=a.append("g").attr("transform",`translate(${i}, ${n+c*o})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${c}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(s.label)})}l(T,"drawLegend");var it={draw:tt},st=l((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const i=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${i};
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
		}
		`}return e},"genIndexStyles"),nt=l(a=>{const t=E(),e=w(),r=y(t,e.themeVariables),i=y(r.radar,a);return{themeVariables:r,radarOptions:i}},"buildRadarStyleOptions"),ot=l(({radar:a}={})=>{const{themeVariables:t,radarOptions:e}=nt(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${st(t,e)}
	`},"styles"),xt={parser:Y,db:f,renderer:it,styles:ot};export{xt as diagram};
