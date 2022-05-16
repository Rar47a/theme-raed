/*! For license information please see 242.js.LICENSE.txt */
"use strict";(self.webpackChunkTheme_One=self.webpackChunkTheme_One||[]).push([[242],{242:(e,s,a)=>{a.r(s),a.d(s,{salla_branches:()=>i});var t=a(8717);const i=class{constructor(e){(0,t.r)(this,e),this.open=!1,this.isOpenedBefore=salla.storage.get("branch-choosed-before"),this.displayAs="default",this.browseProductsFrom="all",this.branches=[{id:1,name:"فرع الرياض",open:!0,available:!0,limited:!1,tag:"متوفر"},{id:2,name:"فرع جدة",open:!1,available:!1,limited:!1,tag:"غير متوفر"},{id:3,name:"فرع مكة",open:!0,available:!0,limited:!1,tag:"متوفر"},{id:4,name:"فرع المدينة",open:!0,available:!0,limited:!1,tag:"متوفر"},{id:5,name:"فرع جازان",open:!0,available:!0,limited:!0,tag:"الكمية محدودة"}],this.current=1,this.currentBranch=e=>this.branches.filter((e=>e.id==this.current))[0][e],this.statusColor=(e=null)=>e?e.limited?"s-branches-color-red":e.available?"s-branches-color-green":"s-branches-color-gray":this.currentBranch("limited")?"s-branches-color-red":this.currentBranch("available")?"s-branches-color-green":"s-branches-color-gray",this.isChoiceable=()=>"all"!==this.browseProductsFrom&&"single"==this.position||"header"==this.position,this.formTitle=()=>this.isChoiceable()?"توفر المنتج في الفروع الآخرى":"التسوق من فرع آخر",salla.event.on("branches::show",(e=>e.dataset.target==this.host.id&&this.show())),salla.lang.onLoaded((()=>{var e;return null===(e=this.btn)||void 0===e?void 0:e.setText(salla.lang.get("common.elements.ok"))}))}async show(){return this.modal.open()}async hide(){return this.modal.close()}handelChange(e){this.selected=e.target.value}handleSubmit(){this.btn.load().then((()=>{setTimeout((()=>location.reload()),2e3)})),salla.storage.set("branch-choosed-before",!0),this.show(),setTimeout((()=>{this.current=this.selected}),300)}render(){return(0,t.h)("salla-modal",{icon:"sicon-store-alt","modal-title":"فرع الرياض","sub-title":"أنت الآن تتصفح المتجر من","sub-title-first":!0,"is-closable":this.isOpenedBefore||"popup"!=this.displayAs?"true":"false",ref:e=>this.modal=e,width:"sm",id:"s-branches-modal",class:"s-hidden"},(0,t.h)("h4",{class:"s-branches-title"},this.formTitle()),this.branches.length<=5?(0,t.h)("div",{class:"s-branches-space-v"},this.branches.map((e=>(0,t.h)("div",{class:"s-branches-input-wrap"},(0,t.h)("input",{id:this.position+"_branch_"+e.id,disabled:!e.open&&this.isChoiceable(),name:"lang",type:"radio",value:e.id,onChange:e=>this.handelChange(e),class:{"s-branches-input":!0,"opacity-50":!e.open,"s-hidden":!this.isChoiceable()},checked:this.current==e.id}),(0,t.h)("label",{htmlFor:this.position+"_branch_"+e.id,class:{"s-branches-label":!0,"s-branches-clickable":this.isChoiceable()}},(0,t.h)("span",{class:{"s-branches-is-closed":!e.open}},e.name),this.isChoiceable()?(0,t.h)("small",{class:"s-branches-closed-badge"},e.open?"":"مُغلق"):(0,t.h)("span",{class:this.statusColor(e)},e.tag)))))):(0,t.h)("select",{class:"s-branches-select",onInput:e=>this.handelChange(e)},this.branches.map((e=>(0,t.h)("option",{value:e.id,disabled:!e.open,selected:this.selected==e.id},e.name," ",e.open?"":"- مُغلق")))),this.isChoiceable()?(0,t.h)("slot",{name:"footer"},(0,t.h)("salla-button",{ref:e=>this.btn=e,onClick:()=>this.handleSubmit(),class:"s-branches-submit",wide:!0},salla.lang.get("common.elements.ok"))):"")}componentDidRender(){this.isOpenedBefore||"popup"!=this.displayAs||this.show()}get host(){return(0,t.g)(this)}};i.style=""}}]);