import{x as J,O as d,u as Q,e as O,d as U,C as _,a4 as q,a6 as H,Y as K,W as X,N as ee,f as te,I as ae,F as ie,Z as ne,a7 as w,a8 as M,a9 as re}from"./index-9ab89410.js";import{m as le}from"./chunk-4BX2VUAB-b4e41fc7-e69e3a8b.js";import{S as se}from"./mermaid-parser.core-6264bd21-444655e1.js";import{h as I}from"./arc-c1018282-26db48e1.js";import{l as oe}from"./ordinal-2f09267b-cbc04e27.js";import"./_baseUniq-aa1cf781-88dabfae.js";import"./_basePickBy-57d45ebd-ca0b6b63.js";import"./clone-181e8389-65fcb847.js";import"./init-77b53fdd-cac434d1.js";function ce(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function pe(e){return e}function ue(){var e=pe,a=ce,g=null,s=w(0),o=w(M),y=w(0);function l(t){var n,c=(t=re(t)).length,p,S,x=0,u=new Array(c),r=new Array(c),m=+s.apply(this,arguments),v=Math.min(M,Math.max(-M,o.apply(this,arguments)-m)),h,b=Math.min(Math.abs(v)/c,y.apply(this,arguments)),C=b*(v<0?-1:1),f;for(n=0;n<c;++n)(f=r[u[n]=n]=+e(t[n],n,t))>0&&(x+=f);for(a!=null?u.sort(function($,A){return a(r[$],r[A])}):g!=null&&u.sort(function($,A){return g(t[$],t[A])}),n=0,S=x?(v-c*C)/x:0;n<c;++n,m=h)p=u[n],f=r[p],h=m+(f>0?f*S:0)+C,r[p]={data:t[p],index:n,value:f,startAngle:m,endAngle:h,padAngle:b};return r}return l.value=function(t){return arguments.length?(e=typeof t=="function"?t:w(+t),l):e},l.sortValues=function(t){return arguments.length?(a=t,g=null,l):a},l.sort=function(t){return arguments.length?(g=t,a=null,l):g},l.startAngle=function(t){return arguments.length?(s=typeof t=="function"?t:w(+t),l):s},l.endAngle=function(t){return arguments.length?(o=typeof t=="function"?t:w(+t),l):o},l.padAngle=function(t){return arguments.length?(y=typeof t=="function"?t:w(+t),l):y},l}var L=J.pie,W={sections:new Map,showData:!1,config:L},D=W.sections,N=W.showData,de=structuredClone(L),fe=d(()=>structuredClone(de),"getConfig"),ge=d(()=>{D=new Map,N=W.showData,Q()},"clear"),me=d(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);D.has(e)||(D.set(e,a),O.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),he=d(()=>D,"getSections"),xe=d(e=>{N=e},"setShowData"),we=d(()=>N,"getShowData"),V={getConfig:fe,clear:ge,setDiagramTitle:X,getDiagramTitle:ee,setAccTitle:te,getAccTitle:ae,setAccDescription:ie,getAccDescription:ne,addSection:me,getSections:he,setShowData:xe,getShowData:we},ye=d((e,a)=>{le(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),Se={parse:d(async e=>{const a=await se("pie",e);O.debug(a),ye(a,V)},"parse")},ve=d(e=>`
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
`,"getStyles"),$e=ve,Ae=d(e=>{const a=[...e.values()].reduce((s,o)=>s+o,0),g=[...e.entries()].map(([s,o])=>({label:s,value:o})).filter(s=>s.value/a*100>=1).sort((s,o)=>o.value-s.value);return ue().value(s=>s.value)(g)},"createPieArcs"),be=d((e,a,g,s)=>{O.debug(`rendering pie chart
`+e);const o=s.db,y=U(),l=_(o.getConfig(),y.pie),t=40,n=18,c=4,p=450,S=p,x=q(a),u=x.append("g");u.attr("transform","translate("+S/2+","+p/2+")");const{themeVariables:r}=y;let[m]=H(r.pieOuterStrokeWidth);m??(m=2);const v=l.textPosition,h=Math.min(S,p)/2-t,b=I().innerRadius(0).outerRadius(h),C=I().innerRadius(h*v).outerRadius(h*v);u.append("circle").attr("cx",0).attr("cy",0).attr("r",h+m/2).attr("class","pieOuterCircle");const f=o.getSections(),$=Ae(f),A=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12];let T=0;f.forEach(i=>{T+=i});const R=$.filter(i=>(i.data.value/T*100).toFixed(0)!=="0"),z=oe(A);u.selectAll("mySlices").data(R).enter().append("path").attr("d",b).attr("fill",i=>z(i.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(R).enter().append("text").text(i=>(i.data.value/T*100).toFixed(0)+"%").attr("transform",i=>"translate("+C.centroid(i)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-(p-50)/2).attr("class","pieTitleText");const P=[...f.entries()].map(([i,F])=>({label:i,value:F})),k=u.selectAll(".legend").data(P).enter().append("g").attr("class","legend").attr("transform",(i,F)=>{const E=n+c,Y=E*P.length/2,Z=12*n,j=F*E-Y;return"translate("+Z+","+j+")"});k.append("rect").attr("width",n).attr("height",n).style("fill",i=>z(i.label)).style("stroke",i=>z(i.label)),k.append("text").attr("x",n+c).attr("y",n-c).text(i=>o.getShowData()?`${i.label} [${i.value}]`:i.label);const G=Math.max(...k.selectAll("text").nodes().map(i=>(i==null?void 0:i.getBoundingClientRect().width)??0)),B=S+t+n+c+G;x.attr("viewBox",`0 0 ${B} ${p}`),K(x,p,B,l.useMaxWidth)},"draw"),Ce={draw:be},Re={parser:Se,db:V,renderer:Ce,styles:$e};export{Re as diagram};
