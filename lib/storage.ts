export function saveGame(s:any){
  localStorage.setItem("save",JSON.stringify(s));
}
export function loadGame(){
  const d=localStorage.getItem("save");
  return d?JSON.parse(d):null;
}
