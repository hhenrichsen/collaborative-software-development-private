import{x as B,O as g,e as w,a4 as C,Y as v,C as m,f as S,I as F,W as P,N as W,Z as D,F as E,G as T,u as I}from"./index-9ab89410.js";import{m as Y}from"./chunk-4BX2VUAB-b4e41fc7-e69e3a8b.js";import{S as A}from"./mermaid-parser.core-6264bd21-444655e1.js";import"./_baseUniq-aa1cf781-88dabfae.js";import"./_basePickBy-57d45ebd-ca0b6b63.js";import"./clone-181e8389-65fcb847.js";var O=B.packet,u,x=(u=class{constructor(){this.packet=[],this.setAccTitle=S,this.getAccTitle=F,this.setDiagramTitle=P,this.getDiagramTitle=W,this.getAccDescription=D,this.setAccDescription=E}getConfig(){const t=m({...O,...T().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){I(),this.packet=[]}},g(u,"PacketDB"),u),H=1e4,L=g((t,e)=>{Y(t,e);let o=-1,r=[],l=1;const{bitsPerRow:n}=e.getConfig();for(let{start:a,end:s,bits:c,label:d}of t.blocks){if(a!==void 0&&s!==void 0&&s<a)throw new Error(`Packet block ${a} - ${s} is invalid. End must be greater than start.`);if(a??(a=o+1),a!==o+1)throw new Error(`Packet block ${a} - ${s??a} is not contiguous. It should start from ${o+1}.`);if(c===0)throw new Error(`Packet block ${a} is invalid. Cannot have a zero bit field.`);for(s??(s=a+(c??1)-1),c??(c=s-a+1),o=s,w.debug(`Packet block ${a} - ${o} with label ${d}`);r.length<=n+1&&e.getPacket().length<H;){const[p,i]=M({start:a,end:s,bits:c,label:d},l,n);if(r.push(p),p.end+1===l*n&&(e.pushWord(r),r=[],l++),!i)break;({start:a,end:s,bits:c,label:d}=i)}}e.pushWord(r)},"populate"),M=g((t,e,o)=>{if(t.start===void 0)throw new Error("start should have been set during first phase");if(t.end===void 0)throw new Error("end should have been set during first phase");if(t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*o)return[t,void 0];const r=e*o-1,l=e*o;return[{start:t.start,end:r,label:t.label,bits:r-t.start},{start:l,end:t.end,label:t.label,bits:t.end-l}]},"getNextFittingBlock"),y={parser:{yy:void 0},parse:g(async t=>{var e;const o=await A("packet",t),r=(e=y.parser)==null?void 0:e.yy;if(!(r instanceof x))throw new Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");w.debug(o),L(o,r)},"parse")},N=g((t,e,o,r)=>{const l=r.db,n=l.getConfig(),{rowHeight:a,paddingY:s,bitWidth:c,bitsPerRow:d}=n,p=l.getPacket(),i=l.getDiagramTitle(),b=a+s,h=b*(p.length+1)-(i?0:a),k=c*d+2,f=C(e);f.attr("viewbox",`0 0 ${k} ${h}`),v(f,h,k,n.useMaxWidth);for(const[$,z]of p.entries())R(f,z,$,n);f.append("text").text(i).attr("x",k/2).attr("y",h-b/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),R=g((t,e,o,{rowHeight:r,paddingX:l,paddingY:n,bitWidth:a,bitsPerRow:s,showBits:c})=>{const d=t.append("g"),p=o*(r+n)+n;for(const i of e){const b=i.start%s*a+1,h=(i.end-i.start+1)*a-l;if(d.append("rect").attr("x",b).attr("y",p).attr("width",h).attr("height",r).attr("class","packetBlock"),d.append("text").attr("x",b+h/2).attr("y",p+r/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(i.label),!c)continue;const k=i.end===i.start,f=p-2;d.append("text").attr("x",b+(k?h/2:0)).attr("y",f).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",k?"middle":"start").text(i.start),k||d.append("text").attr("x",b+h).attr("y",f).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(i.end)}},"drawWord"),j={draw:N},G={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},Z=g(({packet:t}={})=>{const e=m(G,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles"),U={parser:y,get db(){return new x},renderer:j,styles:Z};export{U as diagram};
