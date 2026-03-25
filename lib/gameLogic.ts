function clone(s:any){return JSON.parse(JSON.stringify(s));}

export function getInitialState(){
  return {
    level:1,exp:0,maxExp:100,hp:100,
    stats:{attack:10,defense:8,speed:7,luck:5},
    inventory:[],log:"Start",
    inBattle:false,enemyHP:0,event:null
  }
}

export function cultivate(prev:any){
  const s=clone(prev);
  s.exp+=10;
  s.log="Gain EXP";
  return s;
}

export function explore(prev:any){
  const s=clone(prev);
  const r=Math.random();
  if(r<0.5){s.inBattle=true;s.enemyHP=40;}
  else{s.inventory.push("Item");}
  return s;
}

export function rest(prev:any){
  const s=clone(prev);
  s.hp=Math.min(100,s.hp+20);
  return s;
}

export function attackEnemy(prev:any){
  const s=clone(prev);
  s.enemyHP-=10;
  if(s.enemyHP<=0){s.inBattle=false;s.exp+=20;}
  return s;
}

export function resolveEvent(prev:any,choice:string){
  const s=clone(prev);
  s.event=null;
  return s;
}
