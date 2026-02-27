import{x as _,O as d,u as Q,e as F,b as U,A as Z,a4 as H,a6 as I,G as J,q as K,Y as ee,W as te,N as ae,j as ie,X as ne,a7 as w,a8 as O,a9 as re}from"./index-d2540518.js";import{m as le}from"./chunk-4BX2VUAB-fd274805-0531bc36.js";import{S as se}from"./mermaid-parser.core-c4ad3a48-323d776e.js";import{h as B}from"./arc-ec65040f-422fa96c.js";import{l as oe}from"./ordinal-2f09267b-cbc04e27.js";import"./_baseUniq-08b82021-d842ddd6.js";import"./_basePickBy-f881e13a-c6e8c13a.js";import"./clone-7cfe0ec5-fd6d29d8.js";import"./init-77b53fdd-cac434d1.js";function pe(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function ce(e){return e}function ue(){var e=ce,a=pe,g=null,s=w(0),o=w(O),y=w(0);function l(t){var n,p=(t=re(t)).length,c,S,x=0,u=new Array(p),r=new Array(p),m=+s.apply(this,arguments),v=Math.min(O,Math.max(-O,o.apply(this,arguments)-m)),h,b=Math.min(Math.abs(v)/p,y.apply(this,arguments)),C=b*(v<0?-1:1),f;for(n=0;n<p;++n)(f=r[u[n]=n]=+e(t[n],n,t))>0&&(x+=f);for(a!=null?u.sort(function($,A){return a(r[$],r[A])}):g!=null&&u.sort(function($,A){return g(t[$],t[A])}),n=0,S=x?(v-p*C)/x:0;n<p;++n,m=h)c=u[n],f=r[c],h=m+(f>0?f*S:0)+C,r[c]={data:t[c],index:n,value:f,startAngle:m,endAngle:h,padAngle:b};return r}return l.value=function(t){return arguments.length?(e=typeof t=="function"?t:w(+t),l):e},l.sortValues=function(t){return arguments.length?(a=t,g=null,l):a},l.sort=function(t){return arguments.length?(g=t,a=null,l):g},l.startAngle=function(t){return arguments.length?(s=typeof t=="function"?t:w(+t),l):s},l.endAngle=function(t){return arguments.length?(o=typeof t=="function"?t:w(+t),l):o},l.padAngle=function(t){return arguments.length?(y=typeof t=="function"?t:w(+t),l):y},l}var E=_.pie,W={sections:new Map,showData:!1,config:E},D=W.sections,N=W.showData,de=structuredClone(E),fe=d(()=>structuredClone(de),"getConfig"),ge=d(()=>{D=new Map,N=W.showData,Q()},"clear"),me=d(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);D.has(e)||(D.set(e,a),F.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),he=d(()=>D,"getSections"),xe=d(e=>{N=e},"setShowData"),we=d(()=>N,"getShowData"),L={getConfig:fe,clear:ge,setDiagramTitle:K,getDiagramTitle:ee,setAccTitle:te,getAccTitle:ae,setAccDescription:ie,getAccDescription:ne,addSection:me,getSections:he,setShowData:xe,getShowData:we},ye=d((e,a)=>{le(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),Se={parse:d(async e=>{const a=await se("pie",e);F.debug(a),ye(a,L)},"parse")},ve=d(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),$e=ve,Ae=d(e=>{const a=[...e.values()].reduce((s,o)=>s+o,0),g=[...e.entries()].map(([s,o])=>({label:s,value:o})).filter(s=>s.value/a*100>=1).sort((s,o)=>o.value-s.value);return ue().value(s=>s.value)(g)},"createPieArcs"),be=d((e,a,g,s)=>{F.debug(`rendering pie chart
`+e);const o=s.db,y=U(),l=Z(o.getConfig(),y.pie),t=40,n=18,p=4,c=450,S=c,x=H(a),u=x.append("g");u.attr("transform","translate("+S/2+","+c/2+")");const{themeVariables:r}=y;let[m]=I(r.pieOuterStrokeWidth);m??(m=2);const v=l.textPosition,h=Math.min(S,c)/2-t,b=B().innerRadius(0).outerRadius(h),C=B().innerRadius(h*v).outerRadius(h*v);u.append("circle").attr("cx",0).attr("cy",0).attr("r",h+m/2).attr("class","pieOuterCircle");const f=o.getSections(),$=Ae(f),A=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12];let T=0;f.forEach(i=>{T+=i});const R=$.filter(i=>(i.data.value/T*100).toFixed(0)!=="0"),z=oe(A);u.selectAll("mySlices").data(R).enter().append("path").attr("d",b).attr("fill",i=>z(i.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(R).enter().append("text").text(i=>(i.data.value/T*100).toFixed(0)+"%").attr("transform",i=>"translate("+C.centroid(i)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText");const G=[...f.entries()].map(([i,M])=>({label:i,value:M})),k=u.selectAll(".legend").data(G).enter().append("g").attr("class","legend").attr("transform",(i,M)=>{const j=n+p,q=j*G.length/2,X=12*n,Y=M*j-q;return"translate("+X+","+Y+")"});k.append("rect").attr("width",n).attr("height",n).style("fill",i=>z(i.label)).style("stroke",i=>z(i.label)),k.append("text").attr("x",n+p).attr("y",n-p).text(i=>o.getShowData()?`${i.label} [${i.value}]`:i.label);const V=Math.max(...k.selectAll("text").nodes().map(i=>(i==null?void 0:i.getBoundingClientRect().width)??0)),P=S+t+n+p+V;x.attr("viewBox",`0 0 ${P} ${c}`),J(x,c,P,l.useMaxWidth)},"draw"),Ce={draw:be},Re={parser:Se,db:L,renderer:Ce,styles:$e};export{Re as diagram};
