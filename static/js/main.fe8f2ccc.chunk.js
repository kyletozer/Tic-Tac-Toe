(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(8),s=a.n(i),c=(a(14),a(2)),l=a(3),o=a(5),u=a(4),m=a(6),h=a(1),d=function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.marker,t=["square","perfect-center-parent"],a=e?"x"===e?"times":"circle":null;return a&&t.push("marked","marked-".concat(e)),r.a.createElement("div",{onClick:this.props.placeMarker,className:t.join(" ")},a&&r.a.createElement("span",{className:"marker perfect-center-child"},r.a.createElement("i",{className:"fas fa-"+a})))}}]),t}(n.Component),p=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={friend:!1,human:"x"},a.setPlayers=a.setPlayers.bind(Object(h.a)(Object(h.a)(a))),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"setPlayers",value:function(e,t){var a={};a[e]="friend"===e?!this.state.friend:t.target.value,this.setState(a)}},{key:"render",value:function(){var e=this.props,t=e.childStyle,a=e.message,n=e.startGame,i=this.state,s=i.friend,c=i.human;return r.a.createElement("div",{style:t,className:"overlay"},a&&r.a.createElement("div",{className:"winner"},a),r.a.createElement("h2",{className:"heading"},"Tic Tac Toe"),r.a.createElement("form",{id:"set-players",onSubmit:n.bind(null,this.state)},r.a.createElement("div",{className:"form-group opponent",style:{display:"none"}},r.a.createElement("legend",null,"Choose your opponent"),r.a.createElement("label",{htmlFor:"opponent-computer"},r.a.createElement("input",{id:"opponent-computer",type:"radio",name:"opponent",value:"computer",checked:s?"":"checked",onChange:this.setPlayers.bind(this,"friend")}),r.a.createElement("div",null),r.a.createElement("i",{className:"fas fa-desktop"})),r.a.createElement("label",{htmlFor:"opponent-friend"},r.a.createElement("input",{id:"opponent-friend",type:"radio",name:"opponent",value:"friend",checked:s?"checked":"",onChange:this.setPlayers.bind(this,"friend")}),r.a.createElement("div",null),r.a.createElement("i",{className:"fas fa-user"}))),r.a.createElement("div",{className:"form-group team"},r.a.createElement("legend",null,"Choose your side"),r.a.createElement("label",{htmlFor:"team-x"},r.a.createElement("input",{id:"team-x",type:"radio",name:"team",value:"x",checked:"x"===c?"checked":"",onChange:this.setPlayers.bind(this,"human")}),r.a.createElement("div",null),r.a.createElement("i",{className:"fas fa-times"})),r.a.createElement("label",{htmlFor:"team-o"},r.a.createElement("input",{id:"team-o",type:"radio",name:"team",value:"o",checked:"o"===c?"checked":"",onChange:this.setPlayers.bind(this,"human")}),r.a.createElement("div",null),r.a.createElement("i",{className:"far fa-circle"}))),r.a.createElement("button",{className:"button",type:"submit"},"Start Game")))}}]),t}(n.Component),f=function(){return[0,1,2,3,4,5,6,7,8]},v=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={friend:!1,winner:!1,turn:1,human:null,com:null,spaces:f(),xScore:[],oScore:[],winSequences:[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]},a.startGame=a.startGame.bind(Object(h.a)(Object(h.a)(a))),a.placeMarker=a.placeMarker.bind(Object(h.a)(Object(h.a)(a))),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"getScoreUpdateKey",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.state.turn;return((e?t%2===0:t%2!==0)?"x":"o")+"Score"}},{key:"placeMarker",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.state.spaces;"object"===typeof e&&(e=this.getNextMove());var a=t.indexOf(e),n={},r=this.getScoreUpdateKey();-1!==a&&(n.spaces=t.slice(),n.spaces.splice(a,1),n[r]=this.state[r].slice(),n[r].push(e),n.turn=this.state.turn+1,this.setState(n))}},{key:"getNextMove",value:function(){for(var e=this.state,t=e.spaces,a=e.turn,n=e.winSequences,r=e.com,i=this.state[this.getScoreUpdateKey(!0)],s=this.state[this.getScoreUpdateKey()],c=0;c<n.length;c++){for(var l=n[c],o=l.slice(),u=l.slice(),m=0;m<l.length;m++){var h=l[m],d=i.indexOf(h),p=s.indexOf(h);-1!==d&&o.splice(o.indexOf(h),1),-1!==p&&u.splice(u.indexOf(h),1)}if("o"===r&&2===a&&-1!==[0,2,6,8].indexOf(i[0]))return 4;if("o"===r&&4===a&&([0,8].every(function(e){return-1!==i.indexOf(e)})||[2,6].every(function(e){return-1!==i.indexOf(e)})))return 1;if(1===u.length&&-1!==t.indexOf(u[0]))return u[0];if(1===o.length&&-1!==t.indexOf(o[0]))return o[0]}return t[Math.floor(Math.random()*t.length)]}},{key:"checkForWinner",value:function(){for(var e=this.state.winSequences,t=this.state[this.getScoreUpdateKey(!0)],a=0;a<e.length;a++)for(var n=e[a],r=0;r<n.length;r++){var i=n[r];if(-1===t.indexOf(i))break;if(2===r)return!0}return!1}},{key:"endGame",value:function(){this.setState({winner:this.getScoreUpdateKey(!0).substring(0,1)})}},{key:"startGame",value:function(e,t){t.preventDefault();var a=e.human,n="x"===a?"o":"x";this.setState({friend:e.friend,human:a,com:n,winner:null,xScore:[],oScore:[],spaces:f(),turn:1})}},{key:"marker",value:function(e){return-1!==this.state.spaces.indexOf(e)?"":-1===this.state.xScore.indexOf(e)?"o":"x"}},{key:"componentDidUpdate",value:function(){var e=this.state,t=e.turn,a=e.winner,n=e.com,r=e.friend;a||(t>5&&this.checkForWinner()?this.endGame():r||this.getScoreUpdateKey().substring(0,1)!==n||this.placeMarker())}},{key:"render",value:function(){for(var e=[],t={display:"none"},a=this.state,n=a.com,i=a.human,s=a.winner,c=a.turn,l="",o=0;o<9;o++)e.push(r.a.createElement(d,{marker:this.marker.call(this,o),key:o,placeMarker:this.placeMarker.bind(this,o)}));return s===i?l="You Win!":s===n?l="You Lose!":10===c&&(l="Draw!",t.display="block"),n&&!s||(t.display="block"),r.a.createElement("div",{className:"App"},r.a.createElement("div",{id:"board"},r.a.createElement(p,{childStyle:t,startGame:this.startGame.bind(this),message:l}),r.a.createElement("div",{className:"wrap perfect-center-child"},e)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports=a(16)}},[[9,2,1]]]);
//# sourceMappingURL=main.fe8f2ccc.chunk.js.map