const aaa=new Error;
function abs(x){
check(is_num,x)
return Math.abs(x)}
function add(x,y,...z){
check(is_num,x)
check(is_num,y)
const r=x+y;
if(is_full(z))
return add(r,...z)
return r}
function and(x,y,...z){
check(is_bool,x)
check(is_bool,y)
const r=x&&y;
if(is_full(z))
return and(r,...z)
return r}
function angle(...x){
return concat("<",...x,">")}
function append(x,y){
check(is_arr,x)
check(is_arr,y)
for(const value of y)
push(x,value)}
function arr(...x){
return [...x]}
function at(x,y){
check(is_vec,x)
check(is_uint,y)
check(lt,y,x.length)
return x[y]}
function back(x,y){
check(is_vec,x)
if(is_undef(y))
return back(x,0)
check(is_uint,y)
check(lt,y,x.length)
const v=sub(x.length,y,1);
return x[v]}
function brace(...x){
return concat("{",...x,"}")}
function bracket(...x){
return concat("[",...x,"]")}
function call(x,...y){
check(is_fn,x)
if(is_gn(x)){
const g=x(...y);
while(true){
const o=g.next();
if(o.done)
return o.value}}
return x(...y)}
let unsafe=false;
function check(x,...y){
if(unsafe)
return
if(is_empty(y)){
if(is_true(x))
return
if(is_fn(x)){
const v=x();
check(v)
return}}
else{
if(is_fn(x)){
const v=x(...y);
check(v)
return}}
stop("check")}
function chr(x){
check(is_num,x)
return String.fromCharCode(x)}
function clear(x){
check(is_arr,x)
x.splice(0)}
function clone(x){
check(is_def,x)
try{
return copy(x)}
catch{}
return decycle(x)}
function cmp(x,y){
if(is_null(x)){
if(is_null(y)){
if(x>y)
return 1
else if(x<y)
return -1
else
return 0}}
if(is_bool(x)){
if(is_bool(y)){
if(x>y)
return 1
else if(x<y)
return -1
else
return 0}}
if(is_num(x)){
if(is_num(y)){
if(x>y)
return 1
else if(x<y)
return -1
else
return 0}}
if(is_str(x)){
if(is_str(y)){
if(x>y)
return 1
else if(x<y)
return -1
else
return 0}}
if(is_arr(x)){
if(is_arr(y)){
for(const key in x){
const index=to_int(key);
if(index>=y.length)
return -1
const left=at(x,index);
const right=at(y,index);
const r=cmp(left,right);
if(different(r,0))
return r}
return 0}}
if(is_obj(x)){
if(is_obj(y)){
const xkeys=get_keys(x);
const ykeys=get_keys(y);
const r=cmp(xkeys,ykeys);
if(different(r,0))
return r
const xvalues=get_values(x);
const yvalues=get_values(y);
return cmp(xvalues,yvalues)}}
stop("cmp")}
function collate(x,y,z){
check(is_arr,x)
if(is_undef(y))
return collate(x,is_alnum,z)
check(is_fn,y)
if(is_undef(z))
return collate(x,y," ")
const a=[];
for(const value of x){
if(is_empty(value))
continue
if(is_empty(a)){
push(a,value)
continue}
const s=back(a);
const cs=back(s);
const cv=front(value);
const bs=y(cs);
const bv=y(cv);
if(and(bs,bv))
push(a,z)
push(a,value)}
return implode(a)}
function concat(x,y,...z){
if(is_num(x)){
const s=to_str(x);
return concat(s,y,...z)}
if(is_num(y)){
const s=to_str(y);
return concat(x,s,...z)}
check(is_str,x)
check(is_str,y)
const r=x+y;
if(is_full(z))
return concat(r,...z)
return r}
function contain(x,y){
check(is_vec,x)
if(is_str(x)){
check(is_str,y)
if(is_empty(x))
return false
if(is_empty(y))
return false
return x.includes(y)}
else if(is_arr(x)){
check(is_def,y)
if(is_empty(x))
return false
return x.includes(y)}
else
stop()}
function copy(x){
check(is_def,x)
return structuredClone(x)}
function dec(x){
check(is_num,x)
return sub(x,1)}
function decycle(x){
const history=[];
function duplicate(x){
if(is_arr(x)){
const r=[];
for(const value of x){
if(is_undef(value))
continue
if(contain(history,value))
continue
push(history,value)
const v=duplicate(value);
pop(history)
push(r,v)}
return r}
else if(is_obj(x)){
const r={};
for(const key in x){
const value=get(x,key);
if(is_undef(value))
continue
if(contain(history,value))
continue
push(history,value)
const v=duplicate(value);
pop(history)
r[key]=v}
return r}
else
return x}
return duplicate(x)}
function dedup(x){
check(is_arr,x)
const a=dup(x);
clear(x)
for(const value of a){
if(contain(x,value))
continue
push(x,value)}}
function delimit(x,y){
check(is_vec,x)
if(is_str(x)){
const a=explode(x);
return scan(a,y)}
if(is_str(y)){
function match(x){
return same(x,y)}
return delimit(x,match)}
check(is_fn,y)
const r=[];
const a=dup(x);
while(is_full(a)){
const right=shift(a);
if(is_empty(r)){
push(r,right)
continue}
const left=back(r);
const v=concat(left,right);
if(y(v)){
pop(r)
push(r,v)}
else
push(r,right)}
return r}
function different(x,y){
return x!==y}
function dim(x,y){
check(is_num,x)
check(is_def,y)
const r=[];
for(let key=0;key<x;key++)
push(r,y)
return r}
function div(x,y,...z){
check(is_num,x)
check(is_num,y)
check(not,is_zero,y)
const r=x/y;
if(is_full(z))
return div(r,...z)
return r}
function drop(x,y){
check(is_arr,x)
check(is_full,x)
if(is_undef(y))
return x.pop()
check(is_uint,y)
for(let key=0;key<y;key++)
drop(x)}
function dump(x){
const s=to_dump(x);
log(s)}
function dup(x){
check(is_container,x)
if(is_arr(x))
return x.slice()
else if(is_obj(x)){
const r={};
merge(r,x)
return r}
else
stop()}
function each(x,y){
check(is_arr,x)
check(is_fn,y)
x.forEach(y)}
function eq(x,y){
const n=cmp(x,y);
return same(n,0)}
function evaluate(x){
check(is_str,x)
if(same(x,"content"))
return null
try{
return eval(x)}
catch{
return null}}
function every(x,y){
check(is_vec,x)
check(is_fn,y)
if(is_str(x)){
for(const value of x){
if(y(value))
continue
return false}
return true}
else if(is_vec(x))
return x.every(y)
else
stop("every")}
function exclude(x,y){
check(is_arr,x)
check(is_fn,y)
const r=[];
for(const value of x){
if(y(value))
continue
push(r,value)}
return r}
function explain(...x){
if(con.explain)
log(...x)}
function explode(x){
check(is_str,x)
return Array.from(x)}
function filter(x,y){
check(is_arr,x)
check(is_fn,y)
return x.filter(y)}
function find(x,y,z){
check(is_vec,x)
check(is_def,y)
if(is_undef(z))
return find(x,y,0)
if(is_str(x)){
check(is_str,y)
if(is_empty(x))
return -1
if(is_empty(y))
return -1
return x.indexOf(y,z)}
else if(is_arr(x)){
if(is_empty(x))
return -1
return x.indexOf(y,z)}
else
stop("find")}
function front(x){
check(is_vec,x)
check(is_full,x)
return x[0]}
function gt(x,y){
const n=cmp(x,y);
return n>0}
function gte(x,y){
const n=cmp(x,y);
return n>=0}
function has(x,y){
check(is_def,x)
check(is_key,y)
return y in x}
function head(x,y){
check(is_vec,x)
if(is_undef(y))
return head(x,16)
check(is_uint,y)
const n=min(x.length,y);
return slice_l(x,n)}
function implode(x){
check(is_arr,x)
return join(x,"")}
function inc(x){
check(is_num,x)
return add(x,1)}
function join(x,y){
check(is_arr,x)
if(is_undef(y))
return join(x,"\n")
check(is_str,y)
return x.join(y)}
function like_l(x,...y){
check(is_arr,x)
for(let key=0;key<y.length;key++){
if(gte(key,x.length))
return false
const left=at(x,key);
const right=at(y,key);
check(is_str,left)
if(is_str(right)){
if(different(left,right))
return false}
else if(is_fn(right)){
const res=right(left);
check(is_bool,res)
if(is_false(res))
return false}
else
stop("like-l")}
return true}
const con=con_init();
function log(...x){
if(is_single(x)){
const first=front(x);{
if(is_tbl(first)){
if(is_many(first)){
const s=tbl_string(first);
for(const value of split(s))
log(value)
return}}
if(is_txt(first)){
const a=split(first);
for(const value of a)
log(value)
return}}}
if(is_pair(x)){
const first=front(x);
const last=back(x);
if(is_label(first)){
if(is_txt(last)){
const a=split(last);
for(const key in a){
const index=to_uint(key);
const value=at(a,index);
log(first,index,value)}
return}}}
const time=get_time();
const order=con.count;
const data=clone(x);
const event={time,order,data};
con.count++
if(is_full(con.history)){
const context=back(con.history);
push(context,event)}
else
con_print(con,event)}
function lt(x,y){
const n=cmp(x,y);
return n<0}
function lte(x,y){
const n=cmp(x,y);
return n<=0}
function map(x,y){
check(is_arr,x)
check(is_fn,y)
return x.map(y)}
function match_l(x,y){
check(is_str,x)
check(is_str,y)
if(is_empty(x))
return false
if(is_empty(y))
return false
return x.startsWith(y)}
function match_r(x,y){
check(is_str,x)
check(is_str,y)
if(is_empty(x))
return false
if(is_empty(y))
return false
return x.endsWith(y)}
function match(x,y,z){
check(is_str,x)
check(is_str,y)
if(is_undef(z)){
const a=[];
return match(x,y,a)}
check(is_arr,z)
const s01=replace(y,"\\?","{question}");
const s02=replace(s01,"\\*","{star}");
const s03=replace(s02,"\\+","{plus}");
const s04=replace(s03,"\\.","{dot}");
const s05=replace(s04,"?","(.)");
const s06=replace(s05,"*","(.*)");
const s07=replace(s06,"+","(.+)");
const s08=replace(s07,"{question}","\\?");
const s09=replace(s08,"{star}","\\*");
const s10=replace(s09,"{plus}","\\+");
const s11=replace(s10,"{dot}","\\.");
const s12=concat("^",s11,"$");
const o=new RegExp(s12,"g");
const result=o.exec(x);
if(is_null(result))
return false
for(const key in result){
if(is_numeric(key)){
const value=get(result,key);
push(z,value)}}
shift(z)
return true}
function max(x,y,...z){
check(is_num,x)
check(is_num,y)
const r=Math.max(x,y);
if(is_full(z))
return max(r,...z)
return r}
function merge(x,y){
if(is_obj(x)){
if(is_obj(y)){
Object.assign(x,y)
return}}
if(is_arr(x)){
if(is_arr(y)){
for(const value of y){
if(not(contain,x,value))
push(x,value)}
return}}
stop("merge")}
function min(x,y,...z){
check(is_num,x)
check(is_num,y)
const r=Math.min(x,y);
if(is_full(z))
return min(r,...z)
return r}
function mod(x,y,...z){
check(is_num,x)
check(is_num,y)
check(not,is_zero,y)
const r=x%y;
if(is_full(z))
return mod(r,...z)
return r}
function mul(x,y,...z){
check(is_num,x)
check(is_num,y)
const r=x*y;
if(is_full(z))
return mul(r,...z)
return r}
function mute(x){
check(is_fn,x)
return con_mute(con,x)}
function neq(x,y){
if(eq(x,y))
return false
return true}
function not(x,...y){
if(is_empty(y)){
if(is_bool(x))
return !x
if(is_fn(x)){
const v=x();
return not(v)}}
else{
if(is_fn(x)){
const v=x(...y);
return not(v)}}
stop("not")}
function obj(){
return {}}
function or(x,y,...z){
check(is_bool,x)
check(is_bool,y)
const r=x||y;
if(is_full(z))
return or(r,...z)
return r}
function pad_l(x,y,z){
if(is_uint(x)){
const s=to_str(x);
if(is_undef(z)){
if(is_undef(y))
return pad_l(s,3,"0")
return pad_l(s,y,"0")}
if(is_undef(y))
return pad_l(s,3,z)
return pad_l(s,y,z)}
if(is_undef(z))
return pad_l(x,y," ")
check(is_str,x)
check(is_uint,y)
check(is_str,z)
return x.padStart(y,z)}
function pad_r(x,y,z){
if(is_uint(x)){
const s=to_str(x);
if(is_undef(z)){
if(is_undef(y))
return pad_r(s,3,"0")
return pad_r(s,y,"0")}
if(is_undef(y))
return pad_r(s,3,z)
return pad_r(s,y,z)}
if(is_undef(z))
return pad_r(x,y," ")
check(is_str,x)
check(is_uint,y)
check(is_str,z)
return x.padEnd(y,z)}
function paren(...x){
return concat("(",...x,")")}
function partial(x,...y){
check(is_fn,x)
const fn=x;
const parameters=y;
function r(...x){
 return fn(...parameters,...x)}
return r}
function* pause(x){
check(is_num,x)
const begin=get_now();
while(true){
const now=get_now();
const time=sub(now,begin);
if(gte(time,x))
break}}
function pcall(x,...y){
check(is_fn,x)
try{
return x(...y)}
catch{}}
function pop(x,y){
check(is_arr,x)
check(is_full,x)
if(is_undef(y))
return x.pop()
check(is_uint,y)
const r=[];
for(let key=0;key<y;key++){
const v=pop(x);
push(r,v)}
return r}
function prepend(x,y){
check(is_arr,x)
check(is_arr,y)
for(const key in y){
const v=to_int(key);
const value=back(y,v);
unshift(x,value)}}
function push(x,y){
check(is_arr,x)
check(is_def,y)
return x.push(y)}
function put(x,y,z){
check(is_def,x)
check(is_str,y)
check(is_def,z)
x[y]=z}
function remove(x,y,z){
check(is_arr,x)
check(is_uint,y)
check(lt,y,x.length)
if(is_undef(z))
return remove(x,y,1)
check(is_uint,z)
const n=add(y,z);
check(lte,n,x.length)
x.splice(y,z)}
function repeat(x,y){
check(is_str,x)
check(is_num,y)
return x.repeat(y)}
function replace(x,y,z){
check(is_vec,x)
if(is_str(x)){
check(is_str,x)
check(is_str,y)
const a=split(x,y);
return join(a,z)}
else if(is_arr(x)){
check(is_def,x)
check(is_def,z)
for(const key in x){
const value=get(x,key);
if(same(value,x))
x[key]=y}}
else
stop("replace")}
function reverse(x){
check(is_arr,x)
x.reverse()}
function round(x){
check(is_num,x)
return Math.round(x)}
function same(x,y){
return x===y}
function scan(x,y){
check(is_vec,x)
if(is_str(x)){
const a=explode(x);
return scan(a,y)}
if(is_str(y)){
function match(x){
return same(x,y)}
return scan(x,match)}
check(is_fn,y)
function reduce(x,y){
check(is_arr,x)
check(is_fn,y)
const r=dup(x);
while(is_full(r)){
const s=implode(r);
if(y(s))
return r
pop(r)}
const s=front(x);
push(r,s)
return r}
const r=[];
const a=dup(x);
while(is_full(a)){
const parts=reduce(a,y);
const s=implode(parts);
push(r,s)
shift(a,parts.length)}
return r}
function shed(x){
function is_dispensable(x){
if(is_none(x))
return true
else if(is_zero(x))
return true
else if(is_empty(x))
return true
else
return false}
if(is_arr(x)){
const r=[];
for(const key in x){
const value=get(x,key);
if(is_dispensable(value))
continue
const v=shed(value);
push(r,v)}
return r}
else if(is_obj(x)){
const r={};
for(const key in x){
const value=get(x,key);
if(is_dispensable(value))
continue
const v=shed(value);
r[key]=v}
return r}
else
return x}
function shift(x,y){
check(is_arr,x)
check(is_full,x)
if(is_undef(y))
return x.shift()
check(is_uint,y)
const r=[];
for(let key=0;key<y;key++){
const v=shift(x);
push(r,v)}
return r}
function shuffle(x){
check(is_arr,x)
const a=[];
append(a,x)
clear(x)
while(is_full(a)){
const n=get_random(a.length);
const v=at(a,n);
remove(a,n)
push(x,v)}}
function slice_l(x,y){
check(is_vec,x)
check(is_uint,y)
check(lte,y,x.length)
return slice(x,0,y)}
function slice_r(x,y){
check(is_vec,x)
check(is_uint,y)
check(lte,y,x.length)
const v=sub(x.length,y);
return slice(x,v,y)}
function slice(x,y,z){
check(is_vec,x)
check(is_uint,y)
check(lte,y,x.length)
if(is_undef(z)){
const v=sub(x.length,y);
return slice(x,y,v)}
check(is_uint,z)
check(lte,z,x.length)
const v=add(y,z);
check(lte,v,x.length)
return x.slice(y,v)}
function some(x,y){
check(is_vec,x)
check(is_fn,y)
if(is_str(x)){
for(const value of x){
if(y(value))
return true}
return false}
else if(is_arr(x))
return x.some(y)
else
stop("some")}
function sort(x,y){
check(is_arr,x)
if(is_undef(y)){
x.sort()
return}
check(is_fn,y)
x.sort(y)}
function split(x,y){
check(is_str,x)
if(is_undef(y))
return split(x,"\n")
check(is_str,y)
if(is_empty(x))
return []
return x.split(y)}
function stop(x){
if(is_undef(x))
return stop("stop")
check(is_str,x)
throw new Error(x)}
function strip_l(x,y){
check(is_str,x)
check(is_str,y)
if(match_l(x,y)){
const v=sub(x.length,y.length);
return slice_r(x,v)}
return x}
function strip_r(x,y){
check(is_str,x)
check(is_str,y)
if(match_r(x,y)){
const n=sub(x.length,y.length);
return slice_l(x,n)}
return x}
function sub(x,y,...z){
check(is_num,x)
check(is_num,y)
const r=x-y;
if(is_full(z))
return sub(r,...z)
return r}
function tail(x,y){
check(is_vec,x)
if(is_undef(y))
return tail(x,16)
check(is_uint,y)
const n=min(x.length,y);
return slice_r(x,n)}
function trace(...x){
if(con.verbose)
log(...x)}
function trim_l(x){
check(is_str,x)
return x.trimLeft()}
function trim_r(x){
check(is_str,x)
return x.trimRight()}
function trim(x){
check(is_str,x)
return x.trim()}
function trunc(x){
check(is_num,x)
return Math.trunc(x)}
function uncomment(x){
check(is_str,x)
const a=[];
for(const value of split(x)){
const comment="//";
const v1=delimit(value,is_alnum);
const v2=scan(v1,is_lit);
const v3=scan(v2,comment);
const parts=[];
for(const value of v3){
if(same(value,comment))
break
push(parts,value)}
if(is_empty(parts))
continue
const s=implode(parts);
push(a,s)}
return join(a)}
function unshift(x,y){
check(is_arr,x)
check(is_def,y)
x.unshift(y)}
function untrivia(x){
check(is_str,x)
const s=uncomment(x);
const a=[];
for(const value of split(s)){
const s=trim(value);
if(is_empty(s))
continue
const v1=delimit(s,is_alnum);
const v2=delimit(v1,is_space);
const v3=scan(v2,is_lit);
const v4=exclude(v3,is_space);
const v5=collate(v4);
push(a,v5)}
return join(a)}
function zip(x,y){
check(is_arr,x)
check(is_arr,y)
check(same,x.length,y.length)
const r={};
for(const key in x){
const n=to_uint(key);
const k=at(x,n);
const v=at(y,n);
r[k]=v}
return r}
function con_construct(){
const explain=true;
const verbose=false;
const history=[];
const count=0;
const time_prompt=null;
return {explain,verbose,history,count,time_prompt}}
function con_mute(x,y){
check(is_obj,x)
check(is_fn,y)
function show(x){
for(const value of x.history){
const context=value;
for(const value of context)
con_print(x,value)}
clear(x.history)}
if(x.verbose)
return y
const con=x;
const fn=y;
function call(...x){
let r=null;
const context=[];
push(con.history,context)
try{
r=fn(...x);}
catch(e){
show(con)
throw e}
pop(con.history)
return r}
return call}
function con_time(x,y){
check(is_obj,x)
check(is_obj,y)
const r=evt_time(y);
if(same(r,x.time_prompt)){
if(is_local())
return repeat(" ",r.length)
else
return ""}
x.time_prompt=r;
return r}
function env_continue(x){
check(is_obj,x)
env_tick(x)
if(is_full(x.tasks)){
const timer=timer_init();
const fn=partial(env_continue,x);
timer_fire(timer,fn)}}
function env_init(){
const tasks=[];
const source=null;
const source_offset=null;
return {tasks,source,source_offset}}
function env_push(x,y){
check(is_obj,x)
check(is_task,y)
push(x.tasks,y)}
function env_tick(x){
check(is_obj,x)
const tasks=x.tasks;
const task=front(tasks);
if(is_fn(task)){
task(x)
shift(tasks)}
else if(is_gn(task)){
const iterator=task(x);
shift(tasks)
unshift(tasks,iterator)
env_tick(x)}
else if(is_iterator(task)){
const state=task.next(x);
if(state.done)
shift(tasks)}
else
stop("env-tick")}
function evt_order(x){
check(is_obj,x)
const s=pad_l(x.order,5);
return concat("#",s)}
function evt_parameters(x){
check(is_obj,x)
const data=x.data;
const r=[];
for(const key in data){
const value=get(data,key);
const index=to_int(key);
if(is_zero(index)){
if(is_txt(value)){
const s=to_json(value);
push(r,s)}
else
push(r,value)}
else if(is_undef(value))
push(r,"undef")
else if(is_label(value))
push(r,value)
else if(is_lit(value))
push(r,value)
else if(is_str(value)){
const s=to_json(value);
push(r,s)}
else
push(r,value)}
return r}
function evt_time(x){
check(is_obj,x)
const s1=to_fixed(x.time);
const s2=concat(s1,"s");
const s3=pad_l(s2,6);
return concat(s3,">")}
function get_bsize(x){
check(is_uint,x)
const b=1024;
const kb=mul(b,1024);
const mb=mul(kb,1024);
const gb=mul(mb,1024);
const tb=mul(gb,1024);
if(lt(x,b))
return concat(x,"b")
if(lt(x,kb)){
const n=div(x,b);
const s=to_fixed(n);
return concat(s,"Kb")}
if(lt(x,mb)){
const n=div(x,kb);
const s=to_fixed(n);
return concat(s,"Mb")}
if(lt(x,gb)){
const n=div(x,mb);
const s=to_fixed(n);
return concat(s,"Gb")}
const n=div(x,gb);
const s=to_fixed(n);
return concat(s,"Tb")}
function get_calls(x){
function get_call(x){
check(is_str,x)
const v1=delimit(x,is_alnum);
const v2=scan(v1,is_term);
const a=exclude(v2,is_blank);
if(is_empty(a))
return null
let name=shift(a);
if(is_firefox()){
if(same(name,"@"))
name="global";}
if(not(is_name,name))
return null
if(is_chrome()){
if(is_full(a)){
const s=front(a);
if(same(s,":"))
name="global";}}
const line=get_line(a);
if(is_null(line))
return null
return {name,line}}
function get_line(x){
const a=dup(x);
const offsets=[];
reverse(a)
for(const value of a){
if(is_numeric(value)){
const n=JSON.parse(value);
push(offsets,n)}}
if(not(is_many,offsets))
return null
return at(offsets,1)}
const r=[];
for(const value of get_frames(x)){
const o=get_call(value);
if(not(is_null,o))
push(r,o)}
return r}
function get_date(x){
if(is_undef(x)){
const t=get_now();
return get_date(t)}
check(is_num,x)
const n=mul(x,1000);
const o=new Date(n);
const year=o.getFullYear();
const m=o.getMonth();
const month=inc(m);
const day=o.getDate();
const pmonth=pad_l(month,2);
const pday=pad_l(day,2);
return concat(year,"-",pmonth,"-",pday)}
function get_fns(x){
check(is_str,x)
const r={};
const o=get_globals();
for(const key in o){
const value=get(o,key);
if(is_fn(value)){
const words=split(key,"_");
if(is_single(words))
continue
const first=shift(words);
if(same(first,x)){
const name=join(words,"_");
r[name]=value}}}
return r}
function get_frames(x){
if(is_undef(x)){
const e=new Error("frames");
return get_frames(e)}
check(is_obj,x)
const v1=to_str(x.stack);
const v2=txt_compact(v1);
const r=split(v2);
if(is_v8()){
shift(r)
for(const key in r){
const value=get(r,key);
const s=strip_l(value,"at ");
r[key]=s}}
return r}
function get(x,y){
check(is_def,x)
check(is_key,y)
return x[y]}
function get_globals(){
const r={};
for(const value of get_identifiers()){
const v=evaluate(value);
if(is_fn(v))
r[value]=v}
return r}
function get_hour(x){
if(is_undef(x)){
const t=get_now();
return get_hour(t)}
check(is_num,x)
const n=mul(x,1000);
const o=new Date(n);
const h=o.getHours();
const hour=pad_l(h,2);
const m=o.getMinutes();
const minute=pad_l(m,2);
return concat(hour,":",minute)}
function get_identifiers(){
return split(_identifier," ")}
function get_keys(x){
return Object.keys(x)}
function get_name(x){
if(is_name(x))
return x
if(is_etc(x)){
const a=split(x,":");
return front(a)}
stop("get-name")}
function get_now(){
const v=Date.now();
return div(v,1000)}
let origin=null;
function get_origin(){
if(is_null(origin))
origin=get_now();
return origin}
function get_parameter(x){
check(is_parameter,x)
if(is_etc(x)){
const s=get_name(x);
return concat("...",s)}
return x}
function get_random_str(x){
check(is_num,x)
const a=[];
for(let key=0;key<x;key++){
const n=mul(256,256);
const v=get_random(n);
const s=chr(v);
push(a,s)}
return implode(a)}
function get_random(x){
check(is_num,x)
const n=Math.random();
const r=mul(n,x);
if(is_uint(x))
return trunc(r)
return r}
function get_stack(x){
const a=get_traces(x);
tbl_pad_l(a,"name")
tbl_pad_l(a,"line")
return tbl_string(a)}
function get_time(){
const v1=get_origin();
const v2=get_now();
return sub(v2,v1)}
function get_timestamp(x){
if(is_undef(x)){
const t=get_now();
return get_timestamp(t)}
check(is_num,x)
const d=get_date(x);
const h=get_hour(x);
return concat(d," ",h)}
function get_traces(x){
function is_friend(x){
if(is_camel(x))
return false
if(is_ident(x))
return true
if(is_snake(x))
return true
if(is_access(x)){
const a=split(x,".");
if(every(a,is_friend))
return true}
return false}
function is_foreign(x){
return not(is_friend,x)}
const r=[];
const a=get_calls(x);
const lines=split(env.source);
for(const value of a){
const name=value.name;
if(is_foreign(name))
continue
const line=value.line;
const index=sub(line,1,env.source_offset);
if(is_neg(index))
continue
if(gte(index,lines.length))
continue
const code=at(lines,index);
const o=dup(value);
o.code=code;
push(r,o)}
return r}
function get_type(x){
if(is_none(x))
return "none"
else if(is_bool(x))
return "bool"
else if(is_str(x))
return "str"
else if(is_arr(x))
return "arr"
else if(is_obj(x))
return "obj"
else if(is_fn(x))
return "fn"
else if(is_gn(x))
return "gn"
else
return "other"}
function get_values(x){
return Object.values(x)}
function is_access(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
const a=split(x,".");
if(is_single(a))
return false
return every(a,is_ident)}
function is_alnum(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
for(const value of x){
if(is_alpha(value));
else if(is_digit(value));
else
return false}
return true}
let alpha=null;
function is_alpha(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
if(is_null(alpha)){
const v1="abcdefghijklmnopqrstuvwxyz";
const v2=to_upper(v1);
alpha=concat(v1,v2,"_");}
for(const value of x){
if(not(contain,alpha,value))
return false}
return true}
function is_argument(x){
if(is_ident(x))
return true
if(is_etc(x))
return true
return false}
function is_arr(x){
return Array.isArray(x)}
function is_blank(x){
if(not(is_str,x))
return false
if(is_empty(x))
return true
return is_space(x)}
function is_bool(x){
const s=typeof(x);
return same(s,"boolean")}
function is_boolic(x){
if(same(x,"true"))
return true
if(same(x,"false"))
return true
return false}
function is_callable(x){
if(is_fn(x))
return true
if(is_gn(x))
return true
return false}
function is_camel(x){
if(not(is_ident,x))
return false
for(const value of x){
if(same(value,"_"))
continue
if(is_alpha(value)){
if(is_upper(value))
return true}}
return false}
function is_canonic(x){
if(not(is_json,x))
return false
const v1=JSON.parse(x);
const v2=JSON.stringify(v1);
return same(v2,x)}
function is_chrome(){
if(is_local())
return false
const s=to_lower(navigator.userAgent);
return contain(s,"chrome")}
function is_comment(x){
if(is_ln(x)){
if(match_l(x,"//"))
return true}
return false}
function is_container(x){
if(is_arr(x))
return true
if(is_obj(x))
return true
return false}
function is_cool(x){
if(is_num(x))
return true
if(is_str(x))
return true
return false}
function is_def(x){
return not(is_undef,x)}
function is_digit(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
const s="0123456789";
for(const value of x){
if(not(contain,s,value))
return false}
return true}
function is_empty(x){
if(is_vec(x))
return is_zero(x.length)
else if(is_obj(x)){
for(const key in x)
return false
return true}
return false}
function is_etc(x){
if(is_tuple(x)){
const a=split(x,":");
if(is_pair(a)){
const s=back(a);
return same(s,"etc")}}
return false}
function is_false(x){
return same(x,false)}
function is_firefox(){
if(is_local())
return false
const s=to_lower(navigator.userAgent);
return contain(s,"firefox")}
function is_fn(x){
if(is_gn(x))
return false
const v=typeof(x);
return same(v,"function")}
function is_full(x){
if(is_vec(x))
return is_pos(x.length)
else if(is_obj(x)){
for(const key in x)
return true
return false}
return false}
function is_gn(x){
const v=typeof(x);
if(different(v,"function"))
return false
const s=x.constructor.name;
return same(s,"GeneratorFunction")}
function is_ident(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
const v=front(x);
if(not(is_alpha,v))
return false
return is_alnum(x)}
function is_int(x){
return Number.isInteger(x)}
function is_iterable(x){
try{
for(const key in x)
return true}
catch{
return false}
return true}
function is_iterator(x){
return has(x,Symbol.iterator)}
function is_json(x){
if(not(is_str,x))
return false
try{
JSON.parse(x)}
catch{
return false}
return true}
function is_key(x){
if(is_str(x))
return true
if(is_sym(x))
return true
return false}
function is_label(x){
if(is_name(x))
return true
if(is_lisp(x))
return true
return false}
function is_lisp(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
const a=split(x,"-");
if(is_single(a))
return false
return every(a,is_alnum)}
function is_lit(x){
if(not(is_canonic,x))
return false
const v=JSON.parse(x);
return is_str(v)}
function is_ln(x){
if(is_str(x)){
if(contain(x,"\n"))
return false
if(contain(x,"\r"))
return false
return true}
return false}
function is_local(){
if(is_remote())
return false
return true}
function is_lower(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
const s=to_lower(x);
return same(x,s)}
function is_many(x){
if(is_vec(x))
return gt(x.length,1)
return false}
function is_name(x){
if(is_ident(x))
return true
if(is_access(x))
return true
return false}
function is_neg(x){
if(not(is_num,x))
return false
return lt(x,0)}
function is_nl(x){
if(same(x,"\n"))
return true
if(same(x,"\r"))
return true
if(same(x,"\r\n"))
return true
return false}
function is_node(){
return is_local()}
function is_none(x){
if(is_undef(x))
return true
if(is_null(x))
return true
return false}
function is_nonic(x){
if(same(x,"undefined"))
return true
if(same(x,"null"))
return true
return false}
function is_null(x){
return same(x,null)}
function is_num(x){
if(Number.isNaN(x))
return false
if(not(Number.isFinite,x))
return false
const s=typeof(x);
return same(s,"number")}
function is_numeric(x){
if(not(is_canonic,x))
return false
const v=JSON.parse(x);
return is_num(v)}
function is_obj(x){
if(is_null(x))
return false
if(is_arr(x))
return false
const s=typeof(x);
return same(s,"object")}
function is_one(x){
return same(x,1)}
function is_pair(x){
if(is_arr(x))
return is_two(x.length)
return false}
function is_parameter(x){
if(is_val(x))
return true
if(is_etc(x))
return true
return false}
function is_pos(x){
if(not(is_num,x))
return false
return gt(x,0)}
function is_punct(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
const s="!\"#$%&'()*+,-./:;<=>?@[\\]^`{|}~";
for(const value of x){
if(not(contain,s,value))
return false}
return true}
function is_relative(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
const a=path_split(x);
if(contain(a,"."))
return true
if(contain(a,".."))
return true
if(match_l(x,"/"))
return false
return true}
let window_exist=null;
function is_remote(){
if(is_null(window_exist)){
const o=evaluate("window");
window_exist=is_obj(o);}
return window_exist}
const scopes=[];
function is_scope(x){
if(is_empty(scopes)){
const v1="fn gn begin try catch if elseif else finally forin fornum forof while";
const v2=split(v1," ");
append(scopes,v2)}
return contain(scopes,x)}
function is_serializable(x){
try{
JSON.stringify(x)}
catch{
return true}
return false}
function is_single(x){
if(is_vec(x))
return is_one(x.length)
return false}
function is_snake(x){
if(not(is_ident,x))
return false
if(not(contain,x,"_"))
return false
if(not(is_lower,x))
return false
return true}
function is_space(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
const s=" \t";
for(const value of x){
if(not(contain,s,value))
return false}
return true}
function is_str(x){
const s=typeof(x);
return same(s,"string")}
function is_sym(x){
const s=typeof(x);
return same(s,"symbol")}
function is_task(x){
if(is_fn(x))
return true
if(is_gn(x))
return true
if(is_iterator(x))
return true
return false}
function is_tbl(x){
if(not(is_arr,x))
return false
if(is_empty(x))
return true
const first=front(x);
if(not(is_obj,first))
return false
const columns=get_keys(first);
for(const value of x){
if(not(is_obj,value))
return false
const keys=get_keys(value);
if(neq(keys,columns))
return false}
return true}
function is_term(x){
if(is_val(x))
return true
if(is_tuple(x))
return true
return false}
function is_token(x){
if(is_comment(x))
return true
if(is_term(x))
return true
return false}
function is_true(x){
return same(x,true)}
function is_tuple(x){
if(not(is_str,x))
return false
const a=split(x,":");
if(is_single(a))
return false
return every(a,is_ident)}
function is_two(x){
return same(x,2)}
function is_txt(x){
if(is_str(x)){
if(contain(x,"\n"))
return true
if(contain(x,"\r"))
return true}
return false}
function is_uint(x){
if(not(is_int,x))
return false
if(is_zero(x))
return true
if(is_pos(x))
return true
return false}
function is_undef(x){
return same(x,undefined)}
function is_upper(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
const s=to_upper(x);
return same(x,s)}
function is_url(x){
if(is_ln(x)){
if(match_l(x,"http://"))
return true
if(match_l(x,"https://"))
return true}
return false}
function is_v8(){
if(is_chrome())
return true
if(is_node())
return true
return false}
function is_val(x){
if(is_numeric(x))
return true
if(is_lit(x))
return true
if(is_ident(x))
return true
if(is_access(x))
return true
return false}
function is_vec(x){
if(is_str(x))
return true
return is_arr(x)}
function is_word(x){
if(not(is_str,x))
return false
if(is_empty(x))
return false
if(is_lit(x))
return true
if(some(x,is_space))
return false
return true}
function is_zero(x){
if(same(x,0))
return true
if(same(x,-0))
return true
return false}
function path_join(x){
const sep=path_sep();
return join(x,sep)}
function path_split(x){
check(is_str,x)
const sep=path_sep();
return split(x,sep)}
function tbl_convert(x){
if(is_tbl(x))
return x
else if(is_arr(x)){
const r=[];
const keys=[];
for(const value of x){
if(is_obj(value)){
const a=get_keys(value);
merge(keys,a)}
else if(not(contain,keys,"value"))
push(keys,"value")}
for(const value of x){
const a=dim(keys.length,null);
const o=zip(keys,a);
if(is_obj(value)){
for(const key in value){
const v=get(value,key);
o[key]=v}}
else
o["value"]=value
push(r,o)}
return r}
else if(is_obj(x)){
const r=[];
for(const key in x){
const value=get(x,key);
const o={key,value};
push(r,o)}
return r}
else
stop("tbl-convert")}
function tbl_order(x){
check(is_arr,x)
for(const key in x){
const index=to_uint(key);
const order=inc(index);
const value=get(x,key);
const v={order};
merge(v,value)
x[key]=v}}
function tbl_pad_l(x,y){
check(is_arr,x)
check(is_str,y)
let length=y.length;
for(const value of x){
const v1=get(value,y);
const v2=to_str(v1);
length=max(length,v2.length);}
for(const value of x){
const v1=get(value,y);
const v2=to_str(v1);
const v3=pad_l(v2,length," ");
value[y]=v3}}
function tbl_remove_column(x,y){
check(is_arr,x)
check(is_str,y)
const a=dup(x);
clear(x)
for(const value of a){
const o={};
for(const key in value){
if(same(key,y))
continue
const v=get(value,key);
o[key]=v}
push(x,o)}}
function tbl_sort(x,y){
check(is_arr,x)
check(is_str,y)
function compare(x,y,z){
check(is_str,x)
check(is_obj,y)
check(is_obj,z)
const left=get(y,x);
const right=get(z,x);
return cmp(left,right)}
const fn=partial(compare,y);
sort(x,fn)}
function tbl_string(x){
check(is_arr,x)
if(is_empty(x))
return ""
const o=front(x);
const columns=get_keys(o);
const lengths=[];
for(const value of columns)
push(lengths,value.length)
for(const value of x){
const row=get_values(value);
for(const key in row){
const v1=get(row,key);
const v2=to_str(v1);
const n1=v2.length;
const n2=get(lengths,key);
const n3=max(n1,n2);
lengths[key]=n3}}
const lines=[];
const a=[];
for(const key in columns){
const n=get(lengths,key);
const v1=get(columns,key);
const v2=pad_r(v1,n);
push(a,v2)}
const header=join(a," ");
const separator=repeat("-",header.length);
push(lines,separator)
push(lines,header)
push(lines,separator)
for(const value of x){
const row=get_values(value);
const a=[];
for(const key in row){
const n=get(lengths,key);
const v1=get(row,key);
const v2=to_str(v1);
const v3=pad_r(v2,n);
push(a,v3)}
const line=join(a," ");
push(lines,line)}
push(lines,separator)
push(lines,"")
return join(lines)}
function timer_deinit(x){
check(is_obj,x)
const type=x.type;
const id=x.id;
if(is_null(type));
else if(same(type,"single"))
clearTimeout(id)
else if(same(type,"many"))
clearInterval(id)
else
stop("timer-deinit")
x.type=null;
x.id=null;}
function timer_fire(x,y,z){
check(is_obj,x)
check(is_fn,y)
if(is_undef(z)){
const t=div(1,24);
return timer_fire(x,y,t)}
check(is_pos,z)
const n=mul(z,1000);
x.type="single";
x.id=setTimeout(y,n);}
function timer_init(){
const type=null;
const id=null;
return {type,id}}
function timer_repeat(x,y,z){
check(is_obj,x)
check(is_fn,y)
if(is_undef(z)){
const t=div(1,24);
return timer_repeat(x,y,t)}
check(is_pos,z)
const n=mul(z,1000);
x.type="many";
x.id=setInterval(y,n);}
function to_dump(x){
return JSON.stringify(x,null,1)}
function to_fixed(x,y){
check(is_num,x)
if(is_undef(y))
return to_fixed(x,2)
check(is_uint,y)
const s=x.toFixed(y);
if(is_zero(y))
return s
const a=explode(s);
while(is_full(a)){
const v=back(a);
if(same(v,"0"))
pop(a)
else
break}
const v=back(a);
if(same(v,"."))
pop(a)
return implode(a)}
function to_hexa(x){
check(is_num,x)
return x.toString(16)}
function to_int(x){
check(is_str,x)
const r=Number.parseInt(x);
check(is_int,r)
return r}
function to_json(x){
return JSON.stringify(x)}
function to_lit(x){
check(is_str,x)
return to_json(x)}
function to_lower(x){
check(is_str,x)
return x.toLowerCase()}
function to_num(x){
check(is_str,x)
const r=Number.parseFloat(x);
check(is_num,r)
return r}
function to_str(x){
check(is_def,x)
return x.toString()}
function to_uint(x){
check(is_str,x)
const r=to_int(x);
check(is_uint,r)
return r}
function to_upper(x){
check(is_str,x)
return x.toUpperCase()}
function txt_compact(x){
check(is_str,x)
const inputs=split(x);
const outputs=[];
for(const value of inputs){
const s=trim(value);
if(is_full(s))
push(outputs,s)}
return join(outputs)}
function txt_inline(x){
check(is_str,x)
const v1=txt_compact(x);
const v2=split(v1);
return implode(v2)}
function txt_normalize(x){
check(is_str,x)
const inputs=split(x);
const outputs=[];
while(is_full(inputs)){
const s1=shift(inputs);
const s2=replace(s1,"\t"," ");
const s3=trim_r(s2);
if(is_full(s3)){
push(outputs,s3)
continue}
if(is_empty(outputs))
continue
const previous=back(outputs);
if(is_full(previous))
push(outputs,"")}
const s=join(outputs);
return trim_r(s)}
function beep(x,y){
if(is_undef(x))
return beep(0.1,y)
check(is_pos,x)
if(is_undef(y))
return beep(x,500)
check(is_uint,y)
const percent=16;
const down=concat("-",percent,"%");
const up=concat("+",percent,"%");
os_execute("pactl","set-sink-volume",0,down)
os_execute("play","-n","-c1","synth",x,"sine",y)
os_execute("pactl","set-sink-volume",0,up)}
function elinks(x){
const s1=os_execute("elinks","-dump",x);
const s2=txt_normalize(s1);
const lines=split(s2);
const n=find(lines,"References");
if(is_neg(n)){
const text=s2;
const links=[];
return {text,links}}
const a=slice_l(lines,n);
const text=join(a);
shift(lines,n)
shift(lines)
const links=[];
while(is_full(lines)){
const s1=shift(lines);
const s2=trim(s1);
const a=split(s2," ");
if(is_pair(a)){
const s=back(a);
if(is_url(s))
push(links,s)}}
return {text,links}}
const env=env_init();
function init(){
env_push(env,rt_install)
env_push(env,rt_main)
env_continue(env)}
function inspect(x){
const m=require("util");
const depth=null;
const compact=false;
const option={depth,compact};
const s=m.inspect(x,option);
log(s)}
const cache={};
function memoize(x){
check(is_fn,x)
const fn=x;
function call(...x){
return cache_call(cache,fn,...x)}
return call}
function sleep(x){
if(is_undef(x))
return sleep(1)
check(is_pos,x)
os_execute("sleep",x)}
function unescape(x){
check(is_str,x)
return os_pipe(x,"ansi2txt")}
function cache_call(x,y,...z){
check(is_obj,x)
check(is_fn,y)
const fn=y;
const name=y.name;
const parameters=z;
if(not(has,x,name)){
const keys=[];
const values=[];
const entry={keys,values};
x[name]=entry}
const entry=get(x,name);
const keys=entry.keys;
const values=entry.values;
const key=to_json(parameters);
const index=find(keys,key);
if(is_uint(index)){
const value=at(values,index);
return JSON.parse(value)}
const r=fn(...z);
const value=to_json(r);
push(keys,key)
push(values,value)
return r}
function cache_invalidate(x){
check(is_obj,x)
const count=8;
for(const key in x){
const entry=get(x,key);
const keys=entry.keys;
const values=entry.values;
const n=min(count,keys.length);
for(let key=0;key<n;key++){
const n=get_random(keys.length);
remove(keys,n)
remove(values,n)}}}
function cache_load(x,y){
check(is_obj,x)
check(is_str,y)
const content=file_load(y);
const entries=JSON.parse(content);
merge(x,entries)}
function cache_merge(x,y){
check(is_obj,x)
check(is_obj,y)
for(const key in y){
const name=key;
const yentry=get(y,name);
if(has(x,name)){
const ykeys=yentry.keys;
const yvalues=yentry.values;
const xentry=get(x,name);
const xkeys=xentry.keys;
const xvalues=xentry.values;
for(const key in ykeys){
const k=get(ykeys,key);
const v=get(yvalues,key);
const index=find(xkeys,k);
if(is_uint(index))
continue
push(xkeys,k)
push(xvalues,v)}}
else
x[name]=yentry}}
function cache_normalize(x){
check(is_obj,x)
const r={};
for(const key in x){
const value=get(x,key);
if(is_full(value))
r[key]=value}
return r}
function cache_save(x,y){
check(is_obj,x)
check(is_str,y)
const content=to_json(x);
file_save(y,content)}
function cache_update(x,y){
check(is_obj,x)
check(is_str,y)
cache_invalidate(x)
if(is_file(y)){
const cache={};
cache_load(cache,y)
cache_merge(x,cache)}
const o=cache_normalize(x);
cache_save(o,y)}
function con_init(){
const r=con_construct();
const stdout=process.stdout;
if(stdout.isTTY){
r.width=stdout.columns;
r.height=stdout.rows;}
else{
r.width=80;
r.height=25;}
return r}
function con_print(x,y){
check(is_obj,x)
check(is_obj,y)
function get_pid(){
const v1=process.pid;
const v2=to_hexa(v1);
const v3=pad_r(v2,6);
return concat("@",v3)}
const pid=get_pid();
const order=evt_order(y);
const time=con_time(x,y);
const parts=[pid,order,time];
const prompt=join(parts," ");
const parameters=evt_parameters(y);
unshift(parameters,prompt)
if(every(parameters,is_str)){
const s1=join(parameters," ");
const s2=head(s1,x.width);
console.log(s2)
return}
console.log(...parameters)}
function config_init(x){
check(is_str,x)
const r={};
const path=file_locate(x);
const s=file_load(path);
const content=txt_normalize(s);
const lines=split(content);
for(const value of lines){
const s=trim(value);
if(is_empty(s))
continue
const a=split(s," ");
const k=shift(a);
const v=join(a);
r[k]=v}
return r}
function curl_execute(x){
check(is_obj,x)
function apply_get(x,y,z){
check(is_str,x)
check(is_obj,y)
check(is_obj,z)
if(is_empty(y))
return apply(z,x)
const a=[];
for(const key in y){
const value=get(y,key);
const v=encodeURIComponent(value);
const s=concat(key,"=",value);
push(a,s)}
const s=join(a,"&");
const url=concat(x,"?",s);
return apply(z,url)}
function apply_post(x,y,z){
check(is_str,x)
check(is_obj,y)
check(is_obj,z)
const data=to_json(y);
return apply(z,x,"--data",data)}
function apply(x,...y){
check(is_obj,x)
const parameters=[];
push(parameters,"--silent")
push(parameters,"--include")
push(parameters,"--globoff")
if(is_full(x)){
for(const key in x){
const value=get(x,key);
const s=concat(key,": ",value);
push(parameters,"--header")
push(parameters,s)}}
append(parameters,y)
const s1=os_execute("curl",...parameters);
const s2=txt_normalize(s1);
const a=split(s2);
const status=shift(a);
const headers={};
while(is_full(a)){
const s=shift(a);
if(is_empty(s))
break
const separator=": ";
const parts=split(s,separator);
const key=shift(parts);
const value=join(parts,separator);
headers[key]=value}
const s=join(a);
if(is_json(s)){
const body=JSON.parse(s);
return {status,headers,body}}
const body=s;
return {status,headers,body}}
const method=x.method;
const url=x.url;
const parameters=x.parameters;
const headers=x.headers;
if(same(method,"get"))
return apply_get(url,parameters,headers)
else if(same(method,"post"))
return apply_post(url,parameters,headers)
else
stop("curl-execute")}
function curl_init(x,y){
if(is_undef(x))
return curl_init("get",y)
if(is_undef(y))
return curl_init(x,"http://localhost")
const method=x;
const url=y;
const headers={};
const parameters={};
return {method,url,headers,parameters}}
function dir_copy(x,y){
check(is_dir,x)
check(is_str,y)
const m=require("fs");
const recursive=true;
const option={recursive};
m.cpSync(x,y,option)}
function dir_load(x){
check(is_str,x)
const r=[];
for(const value of dir_read(x)){
if(is_file(value))
push(r,value)
else if(is_dir(value)){
const a=dir_load(value);
append(r,a)}
else
stop("dir-load")}
return r}
function dir_locate(x,y){
check(is_str,x)
return fs_locate(x,is_dir,y)}
function dir_make(x){
check(is_str,x)
const m=require("fs");
const recursive=true;
const option={recursive};
m.mkdirSync(x,option)}
function dir_match(x,y){
check(is_str,x)
if(is_undef(y))
return dir_match(x,".")
check(is_str,y)
const r=[];
const dir=path_real(y);
for(const value of dir_load(dir)){
if(match(value,x))
push(r,value)}
return r}
function dir_origin(){
const script=at(process.argv,1);
return path_dir(script)}
function dir_read(x){
check(is_str,x)
const r=[];
const m=require("fs");
const path=path_real(x);
for(const value of m.readdirSync(path)){
const s=path_concat(path,value);
push(r,s)}
sort(r)
return r}
function dir_remove(x){
check(is_str,x)
const m=require("fs");
const recursive=true;
const option={recursive};
m.rmSync(x,option)}
function dir_reset(x){
check(is_str,x)
if(is_dir(x))
dir_remove(x)
dir_make(x)}
function dir_up(x){
check(is_dir,x)
const path=path_real(x);
const a=path_split(path);
pop(a)
return path_join(a)}
function file_append(x,y){
check(is_str,x)
check(is_str,y)
const m=require("fs");
m.appendFileSync(x,y)}
function file_copy(x,y){
check(is_file,x)
check(is_str,x)
if(is_dir(y)){
const base=path_base(x);
const path=path_concat(y,base);
return file_copy(x,path)}
const m=require("fs");
m.copyFileSync(x,y)}
function file_load(x){
check(is_str,x)
const v=file_read(x);
return trim_r(v)}
function file_locate(x,y){
check(is_str,x)
return fs_locate(x,is_file,y)}
function file_read(x){
check(is_str,x)
const m=require("fs");
const o=m.readFileSync(x);
return to_str(o)}
function file_remove(x){
check(is_str,x)
const m=require("fs");
m.unlinkSync(x)}
function file_save(x,y){
check(is_str,x)
check(is_str,y)
if(is_file(x)){
if(is_empty(y)){
file_remove(x)
return}
const n=file_size(x);
const limit=mul(4,1024,1024);
if(lt(n,limit)){
if(same(n,y.length)){
const v=file_read(x);
if(same(v,y))
return}}}
else if(is_empty(y))
return
else{
const dir=path_dir(x);
if(not(is_dir,dir))
dir_make(dir)}
file_write(x,y)}
function file_size(x){
check(is_str,x)
const m=require("fs");
const o=m.statSync(x);
return o.size}
function file_write(x,y){
check(is_str,x)
check(is_str,y)
const m=require("fs");
m.writeFileSync(x,y)}
function fs_locate(x,y,z){
check(is_str,x)
if(is_undef(y))
return fs_locate(x,is_fs,z)
check(is_fn,y)
const base=path_base(x);
const s=path_dir(x);
const dir=path_real(s);
const dirs=path_split(dir);
while(is_full(dirs)){
const dir=path_join(dirs);
const path=path_concat(dir,base);
if(y(path))
return path
pop(dirs)}
if(is_str(z))
return z
stop("fs-locate")}
function get_source_offset(){
return 0}
function get_source(){
return file_load(__filename)}
function git_clean(x){
check(is_obj,x)
const dir=path_concat(x.dir,".git");
dir_remove(dir)}
function git_config(x){
check(is_obj,x)
git_work(x,"config","user.email",x.mail)
git_work(x,"config","user.name",x.user)
git_work(x,"config","init.defaultBranch","main")}
function git_download(x){
check(is_obj,x)
const dir=x.dir;
const home=dir_up(dir);
dir_reset(dir)
os_work(home,"git","clone","--depth",1,x.git)
return x.url}
function git_init(x,y,z){
check(is_str,x)
check(is_str,y)
if(is_undef(z)){
const config=config_init(x);
return git_init(x,y,config.user)}
check(is_str,z)
const config=config_init(x);
const domain=config.domain;
const group=z;
const user=config.user;
const mail=config.mail;
const pat=config.pat;
const dir=path_real(y);
const repo=path_base(dir);
const access=concat(pat,"@",domain);
const auth=concat(user,":",access);
const git=concat("https://",auth,"/",group,"/",repo,".git");
const url=concat("https://",domain,"/",group,"/",repo);
check(is_dir,dir)
return {domain,group,user,mail,pat,dir,repo,git,url}}
function git_upload(x){
check(is_obj,x)
const message=get_timestamp();
git_work(x,"init")
git_config(x)
git_work(x,"add",".")
git_work(x,"commit","-m",message)
git_work(x,"push","--force","--all",x.git)
git_clean(x)
return x.url}
function git_work(x,...y){
check(is_obj,x)
os_work(x.dir,"git",...y)}
function html_inline(x){
check(is_str,x)
const script=replace(x,"</","<\\/");
const a=[];
push(a,"<!doctype html>")
push(a,"<html>")
push(a,"<head>")
push(a,"<meta charset=\"utf-8\">")
push(a,"</head>")
push(a,"<body>")
push(a,"<script>")
push(a,script)
push(a,"</script>")
push(a,"</body>")
push(a,"</html>")
return join(a)}
function html_src(){
const a=[];
push(a,"<!doctype html>")
push(a,"<html>")
push(a,"<body>")
push(a,"<script src=\"/remote\">")
push(a,"</script>")
push(a,"</body>")
push(a,"</html>")
return join(a)}
function http_listen(x,y){
check(is_fn,x)
if(is_undef(y))
return http_listen(x,9000)
const m=require("http");
const r=m.createServer(x);
return r.listen(y)}
function is_dir(x){
const m=require("fs");
try{
const o=m.statSync(x);
return o.isDirectory()}
catch{
return false}}
function is_file(x){
const m=require("fs");
try{
const o=m.statSync(x);
return o.isFile()}
catch{
return false}}
function is_fs(x){
if(is_str(x)){
const m=require("fs");
return m.existsSync(x)}
return false}
function os_execute(x,...y){
check(is_str,x)
trace("execute",x,...y)
const m=require("child_process");
const o=m.spawnSync(x,y);
if(has(o,"error"))
throw o.error
const stdout=o.stdout;
const stderr=o.stderr;
const out=to_str(stdout);
const err=to_str(stderr);
const s=concat(out,err);
return trim_r(s)}
function os_launch(x,...y){
const m=require("child_process");
const detached=true;
const stdio="ignore";
const option={detached,stdio};
const o=m.spawn(x,y,option);
o.unref()}
function os_open(x){
check(is_str,x)
os_launch("xdg-open",x)}
function os_pipe(x,y,...z){
check(is_str,x)
check(is_str,y)
const m=require("child_process");
const input=x;
const option={input};
const o=m.spawnSync(y,z,option);
if(has(o,"error"))
throw o.error
const stdout=o.stdout;
const stderr=o.stderr;
const out=to_str(stdout);
const err=to_str(stderr);
const s=concat(out,err);
return trim_r(s)}
function os_spawn(x,...y){
const m=require("child_process");
const o=m.spawn(x,y);
const pid=o.pid;
const stdin=o.stdin;
const stdout=o.stdout;
const stderr=o.stderr;
return {pid,stdin,stdout,stderr}}
function os_system(x,...y){
check(is_str,x)
trace("system",x,...y)
const m=require("child_process");
const stdio="inherit";
const option={stdio};
const o=m.spawnSync(x,y,option);
return o.status}
function os_work(x,y,...z){
check(is_dir,x)
if(is_str(y))
return os_work(x,os_system,y,...z)
check(is_fn,y)
let r=null;
const dir=process.cwd();
process.chdir(x)
try{
r=y(...z);}
catch(e){
process.chdir(dir)
throw e}
process.chdir(dir)
return r}
function path_base(x){
check(is_str,x)
const m=require("path");
return m.basename(x)}
function path_concat(...x){
const sep=path_sep();
return join(x,sep)}
function path_dir(x){
check(is_str,x)
const m=require("path");
return m.dirname(x)}
function path_ext(x){
check(is_str,x)
const m=require("path");
const v1=m.extname(x);
const v2=strip_l(v1,".");
return to_lower(v2)}
function path_name(x){
check(is_str,x)
const m=require("path");
const o=m.parse(x);
return o.name}
function path_real(x){
check(is_str,x)
const m=require("fs");
return m.realpathSync(x)}
function path_relative(x,y){
check(is_str,x)
if(is_fs(x)){
const s=path_real(x);
if(different(x,s))
return path_relative(s,y)}
if(is_undef(y)){
const s=process.cwd();
return path_relative(x,s)}
if(is_fs(y)){
const s=path_real(y);
if(different(y,s))
return path_relative(s,y)}
check(is_str,y)
const m=require("path");
const r=m.relative(y,x);
if(is_empty(r))
return y
return r}
function path_sep(){
const m=require("path");
return m.sep}
function path_shorten(x){
check(is_str,x)
if(not(is_fs,x))
return x
const real=path_real(x);
if(lt(real.length,x.length))
return real
const relative=path_relative(x);
if(lt(relative.length,x.length))
return relative
return x}
function path_tmp(x,y){
check(is_str,x)
check(is_str,y)
const pattern=path_concat("tmp",x);
if(is_file(pattern)){
const s=file_read(pattern);
if(same(s,y))
return pattern}
const r=path_unique(pattern);
file_save(r,y)
return r}
function path_unique(x){
check(is_str,x)
if(not(is_fs,x))
return x
const dir=path_dir(x);
const name=path_name(x);
const ext=path_ext(x);
for(let key=0;key<10000;key++){
const suffix=pad_l(key,3);
const sname=concat(name,"-",suffix);
let base=sname;
if(is_full(ext))
base=concat(base,".",ext);
const r=path_concat(dir,base);
if(not(is_fs,r))
return r}
stop("path-unique")}
function rt_install(x){
check(is_obj,x)
function get_cache(){
const origin=dir_origin();
const tmp=path_concat(origin,"tmp");
const dir=dir_locate("tmp",tmp);
return path_concat(dir,"cache.txt")}
function on_monitor(x,y){
check(is_obj,x)
check(is_str,y)
const stack=get_stack(x);
log("monitor",x.message,y)
log(stack)}
function on_exception(x,y){
check(is_obj,x)
check(is_str,y)
const frames=get_frames(x);
const s=join(frames);
log("exception",y,x.message)
log("frames",s)
process.exit(1)}
function on_exit(){
const path=at(process.argv,1);
const base=path_base(path);
cache_update(cache,cache_path)
pcall(beep)}
const stdin=process.stdin;
const cache_path=get_cache();
if(stdin.isTTY)
stdin.setRawMode(true)
if(is_file(cache_path))
cache_load(cache,cache_path)
process.on("uncaughtExceptionMonitor",on_monitor)
process.on("uncaughtException",on_exception)
process.on("exit",on_exit)
x.source=get_source();
x.source_offset=get_source_offset();}
function* rt_main(x){
check(is_obj,x)
const arguments=dup(process.argv);
const parameters=[];
const binary=shift(arguments);
const script=shift(arguments);
const base=path_base(script);
const name=path_name(script);
const date=get_timestamp();
while(is_full(arguments)){
const argument=shift(arguments);
if(same(argument,"--unsafe"))
unsafe=true;
else if(same(argument,"--verbose"))
con.verbose=true;
else if(same(argument,"--silent")){
con.explain=false;
con.verbose=false;}
else if(same(argument,"--reset")){
if(is_file(cache_path))
file_remove(cache_path)}
else if(is_numeric(argument)){
const n=to_uint(argument);
push(parameters,n)}
else
push(parameters,argument)}
explain("enter",base,"at",date)
if(is_fn(main))
main(...parameters)
else if(is_gn(main)){
const iterator=main(...parameters);
while(true){
const state=iterator.next();
if(state.done)
break
yield}}
else
stop("rt-main")}
function terminal_peek(){
function read(){
const m=require("fs");
const n=process.stdin.fd;
const o=Buffer.from(" ");
try{
m.readSync(n,o)}
catch{
return false}
return o.toString()}
const a=[];
while(true){
const s=read();
if(is_str(s))
push(a,s)
else
break}
return implode(a)}
function url_base(x){
check(is_url,x)
const o=new URL(x);
const path=o.pathname;
return path_base(path)}
function url_name(x){
check(is_url,x)
const o=new URL(x);
const path=o.pathname;
return path_name(path)}
function app_build_local(x){
check(is_str,x)
const dir=app_dir(x);
const local=path_concat(dir,"local.rs");
const content=file_load(local);
const silent_compile=mute(compile);
const source=os_work(dir,silent_compile,content);
const identifier1=code_identifiers(source);
const identifier2=join(identifier1," ");
const var_identifier=code_var("_identifier",identifier2);
const code_js=concat(source,"\n",var_identifier,"\n","init()");
const code_sh=sh_inline(code_js);
const out=dir_locate("out");
const prefix=path_concat(out,x);
const js=concat(prefix,".js");
const sh=prefix;
file_save(js,code_js)
file_save(sh,code_sh)
script_check(js)
os_system("chmod","+x",sh)}
function app_build_remote(x){
check(is_str,x)
const dir=app_dir(x);
const remote=path_concat(dir,"remote.rs");
const content=file_load(remote);
const silent_compile=mute(compile);
const source=os_work(dir,silent_compile,content);
const identifier1=code_identifiers(source);
const identifier2=join(identifier1," ");
const var_identifier=code_var("_identifier",identifier2);
const code_js=concat(source,"\n",var_identifier,"\n","init()");
const code_html=html_inline(code_js);
const out=dir_locate("out");
const prefix=path_concat(out,x);
const js=concat(prefix,"-html.js");
const html=concat(prefix,".html");
file_save(js,code_js)
file_save(html,code_html)
script_check(js)}
function app_build(x){
check(is_str,x)
if(is_local_app(x))
app_build_local(x)
else if(is_remote_app(x))
app_build_remote(x)
else
stop("app-build")}
function app_dir(x){
check(is_str,x)
const app=dir_locate("src/app");
const r=path_concat(app,x);
check(is_dir,r)
return r}
function app_run(x,...y){
check(is_str,x)
const out=dir_locate("out");
const js=concat(out,"/",x,".js");
const html=concat(out,"/",x,".html");
if(is_file(js))
script_run(js,...y)
else if(is_file(html)){
if(contain(y,"--debug"))
os_system("google-chrome","--disable-web-security","--user-data-dir=tmp/chrome-session",html)
else
os_open(html)}
else
stop("run")}
function code_identifiers(x){
check(is_str,x)
const r=[];
const lines=split(x);
for(const value of lines){
if(gt(value.length,1024)){
log("skip",value)
continue}
const words=delimit(value,is_alnum);
for(const value of words){
if(is_snake(value)){
if(contain(r,value))
continue
push(r,value)}}}
sort(r)
return r}
function code_var(x,y){
check(is_str,x)
if(is_str(y)){
if(not(is_lit,y)){
const s=to_lit(y);
return code_var(x,s)}}
if(not(is_json,y)){
const s=to_json(y);
return code_var(x,s)}
return concat("const ",x,"=",y)}
const rules={};
function compile(x){
check(is_str,x)
function apply(x){
check(is_obj,x)
const operator=x.operator;
const parameters=x.parameters;
log("apply",operator,...parameters)
if(has(rules,operator)){
const fn=get(rules,operator);
const s=fn(...parameters);
check(is_fn,fn)
check(is_str,s)
return split(s)}
const s=rule_call(operator,...parameters);
check(is_str,s)
return split(s)}
function compress(x){
check(is_str,x)
const output=[];
const input=split(x);
while(is_full(input)){
const line=shift(input);
if(is_empty(output))
push(output,line)
else if(is_punct(line)){
const s1=back(output);
const s2=concat(s1,line);
pop(output)
push(output,s2)}
else
push(output,line)}
return join(output)}
function translate(x){
check(is_obj,x)
const a=apply(x);
const operator=x.operator;
const children=x.children;
let node=false;
if(is_full(children))
node=true;
if(is_scope(operator))
node=true;
if(node){
let brace=true;
if(is_control(operator)){
if(is_single(children)){
const child=front(children);
const operator=child.operator;
if(same(operator,"let")){}
else if(same(operator,"var")){}
else if(same(operator,"fn")){}
else if(is_empty(child.children))
brace=false;}}
if(brace)
push(a,"{")
for(const value of children){
const s=translate(value);
if(is_full(s))
push(a,s)}
if(brace)
push(a,"}")}
return join(a)}
if(is_empty(rules)){
const o=get_fns("rule");
merge(rules,o)}
const a=[];
for(const value of implement(x)){
const s=translate(value);
if(is_full(s))
push(a,s)}
const s=join(a);
return compress(s)}
let last_result=0;
function implement(x){
check(is_str,x)
function apply(x){
function get_rvalue(x,y){
check(is_arr,x)
if(is_undef(y))
return get_rvalue(x,0)
check(is_uint,y)
const r=slice(x,y);
if(is_single(r)){
const first=front(r);
if(is_name(first))
return ["call",first]}
return r}
if(is_arr(x)){
const r=[];
for(const value of x){
const v=apply(value);
if(is_arr(v))
append(r,v)
else if(is_obj(v))
push(r,v)
else
stop("apply")}
return r}
if(is_perform(x)){
const r=[];
const parameters=x.parameters;
const rvalue=get_rvalue(parameters);
const a02=write(r,"begin");
const a03=write(a02,"let","_iterator",...rvalue);
const a04=write(a02,"while");
const a05=write(a04,"let","_state","call","_iterator.next");
const a06=write(a04,"if","_state.done");
const a07=write(a06,"brk");
const a08=write(a04,"yield");
return r}
if(is_var_perform(x)){
const r=[];
const parameters=x.parameters;
const ident=at(parameters,0);
const rvalue=get_rvalue(parameters,2);
const a01=write(r,"var",ident,"null");
const a02=write(r,"begin");
const a03=write(a02,"let","_iterator",...rvalue);
const a04=write(a02,"while");
const a05=write(a04,"let","_state","call","_iterator.next");
const a06=write(a04,"if","_state.done");
const a07=write(a06,"assign",ident,"_state.value");
const a08=write(a06,"brk");
const a09=write(a04,"yield");
return r}
if(is_let_perform(x)){
const r=[];
const parameters=x.parameters;
const ident=at(parameters,0);
const rvalue=get_rvalue(parameters,2);
last_result++
const result=concat("_result_",last_result);
const a01=write(r,"var",result,"null");
const a02=write(r,"begin");
const a03=write(a02,"let","_iterator",...rvalue);
const a04=write(a02,"while");
const a05=write(a04,"let","_state","call","_iterator.next");
const a06=write(a04,"if","_state.done");
const a07=write(a06,"assign",result,"_state.value");
const a08=write(a06,"brk");
const a09=write(a04,"yield");
const a10=write(r,"let",ident,result);
return r}
if(is_assign_perform(x)){
const r=[];
const parameters=x.parameters;
const ident=at(parameters,0);
const rvalue=get_rvalue(parameters,2);
const a01=write(r,"assign",ident,"null");
const a02=write(r,"begin");
const a03=write(a02,"let","_iterator",...rvalue);
const a04=write(a02,"while");
const a05=write(a04,"let","_state","call","_iterator.next");
const a06=write(a04,"if","_state.done");
const a07=write(a06,"assign",ident,"_state.value");
const a08=write(a06,"brk");
const a09=write(a04,"yield");
return r}
if(is_ret_perform(x)){
const r=[];
const parameters=x.parameters;
const rvalue=get_rvalue(parameters,1);
last_result++
const result=concat("_result_",last_result);
const a01=write(r,"var",result,"null");
const a02=write(r,"begin");
const a03=write(a02,"let","_iterator",...rvalue);
const a04=write(a02,"while");
const a05=write(a04,"let","_state","call","_iterator.next");
const a06=write(a04,"if","_state.done");
const a07=write(a06,"assign",result,"_state.value");
const a08=write(a06,"brk");
const a09=write(a04,"yield");
const a10=write(r,"ret",result);
return r}
check(is_obj,x)
const operator=x.operator;
const parameters=x.parameters;
const children=[];
for(const value of x.children){
const v=apply(value);
if(is_arr(v))
append(children,v)
else if(is_obj(v))
push(children,v)
else
stop("apply")}
return {operator,parameters,children}}
function is_assign_perform(x){
if(not(is_obj,x))
return false
if(different(x.operator,"assign"))
return false
return like_l(x.parameters,is_name,"perform",is_name)}
function is_define_perform(x,y){
check(is_str,y)
if(not(is_obj,x))
return false
if(different(x.operator,y))
return false
return like_l(x.parameters,is_ident,"perform",is_name)}
function is_let_perform(x){
return is_define_perform(x,"let")}
function is_perform(x){
if(not(is_obj,x))
return false
if(different(x.operator,"perform"))
return false
return like_l(x.parameters,is_name)}
function is_ret_perform(x){
if(not(is_obj,x))
return false
if(different(x.operator,"ret"))
return false
return like_l(x.parameters,"perform",is_name)}
function is_var_perform(x){
return is_define_perform(x,"var")}
function write(x,y,...z){
check(is_arr,x)
check(is_ident,y)
const operator=y;
const parameters=z;
const children=[];
const o={operator,parameters,children};
push(x,o)
return o.children}
const a=preprocess(x);
return apply(a)}
function parse(x){
check(is_str,x)
function fold(x){
const parent=shift(x);
const indent=parent.indent;
const descendants=[];
while(is_full(x)){
const descendant=front(x);
if(lte(descendant.indent,indent))
break
shift(x)
push(descendants,descendant)}
const children=[];
while(is_full(descendants)){
const child=fold(descendants);
push(children,child)}
const operator=parent.operator;
const parameters=parent.parameters;
return {operator,parameters,children}}
function group(x){
const r=[];
const lines=split(x);
for(const value of lines){
if(is_blank(value))
continue
log("group",value)
const s=trim_l(value);
const indent=sub(value.length,s.length);
const v1=delimit(s,is_alnum);
const v2=scan(v1,is_term);
const parameters=exclude(v2,is_blank);
const first=front(parameters);
check(every,parameters,is_term)
if(is_ident(first)){
shift(parameters)
const operator=first;
const o={indent,operator,parameters};
push(r,o)}
else if(is_access(first)){
const operator="call";
const o={indent,operator,parameters};
push(r,o)}
else
stop()}
return r}
function normalize(x){
if(is_arr(x)){
const r=[];
for(const value of x){
const s=value.operator;
if(same(s,"end"))
continue
const node=normalize(value);
push(r,node)}
return r}
else if(is_obj(x)){
const operator=x.operator;
const parameters=x.parameters;
const children=normalize(x.children);
return {operator,parameters,children}}
else
stop("normalize")}
const v1=uncomment(x);
const v2=group(v1);
const v3=[];
while(is_full(v2)){
const node=fold(v2);
push(v3,node)}
return normalize(v3)}
function preprocess(x){
check(is_str,x)
function apply(x){
if(is_arr(x)){
const r=[];
for(const value of x){
const v=apply(value);
if(is_arr(v))
append(r,v)
else if(is_obj(v))
push(r,v)
else
stop("apply")}
return r}
if(is_include(x)){
const path=front(x.parameters);
const s=JSON.parse(path);
return include(s)}
if(is_let_embed(x)){
const ident=at(x.parameters,0);
const path=at(x.parameters,2);
const s=JSON.parse(path);
return let_embed(ident,s)}
if(is_run(x)){
const a=map(x.parameters,to_arg);
os_execute(...a)
return get_nop()}
if(is_var_run(x))
return var_run(x)
if(is_let_run(x))
return let_run(x)
if(is_work(x)){
const a=map(x.parameters,to_arg);
const dir=shift(a);
os_work(dir,os_execute,...a)
return get_nop()}
if(is_var_work(x))
return var_work(x)
if(is_let_work(x))
return let_work(x)
check(is_obj,x)
const operator=x.operator;
const parameters=x.parameters;
const children=[];
for(const value of x.children){
const v=apply(value);
if(is_arr(v))
append(children,v)
else if(is_obj(v))
push(children,v)
else
stop("apply")}
return {operator,parameters,children}}
function define_run(x,y){
check(is_obj,x)
check(is_str,y)
const name=at(x.parameters,0);
const a1=slice(x.parameters,2);
const a2=map(a1,to_arg);
const s=os_execute(...a2);
log("run",s)
const v=to_json(s);
const operator=y;
const parameters=[name,v];
const children=[];
return {operator,parameters,children}}
function define_work(x,y){
check(is_obj,x)
check(is_str,y)
const name=at(x.parameters,0);
const a1=slice(x.parameters,2);
const a2=map(a1,to_arg);
const dir=shift(a2);
const s=os_work(dir,os_execute,...a2);
log("work",s)
const v=to_json(s);
const operator=y;
const parameters=[name,v];
const children=[];
return {operator,parameters,children}}
function get_nop(){
const operator="nop";
const parameters=[];
const children=[];
return {operator,parameters,children}}
function get_operation(x){
check(is_str,x)
const ext=path_ext(x);
if(same(ext,"rs"))
return "preprocess"
if(same(ext,"js")){
const dir=path_dir(x);
const name=path_name(x);
const prefix=path_concat(dir,name);
const rs=concat(prefix,".rs");
if(is_file(rs))
return "skip"
return "inline"}
if(same(ext,"txt"))
return "skip"
stop("get-operation")}
function include_dir(x){
check(is_str,x)
const r=[];
if(is_sub_dir(x)){
for(const value of dir_read(x)){
const a=include_dir(value);
append(r,a)}}
else{
for(const value of dir_read(x)){
if(is_file(value)){
const v=include_file(value);
if(is_arr(v))
append(r,v)
else if(is_obj(v))
push(r,v)
else
stop("include-dir")}}}
return r}
function include_file(x){
check(is_str,x)
const operation=get_operation(x);
if(same(operation,"preprocess")){
const dir=path_dir(x);
const content=file_load(x);
return os_work(dir,preprocess,content)}
if(same(operation,"inline")){
const cache_untrivia=memoize(untrivia);
const content=file_load(x);
const code=cache_untrivia(content);
const s=to_lit(code);
const operator="inline";
const parameters=[s];
const children=[];
return {operator,parameters,children}}
if(same(operation,"skip"))
return []
stop("include-file")}
function include(x){
check(is_str,x)
const path=path_real(x);
log("include",path)
if(is_file(path))
return include_file(path)
else if(is_dir(path))
return include_dir(path)
else
stop("include")}
function is_coolic(x){
if(is_lit(x))
return true
if(is_numeric(x))
return true
return false}
function is_define_run(x,y){
return is_define(x,y,"run")}
function is_define_work(x,y){
return is_define(x,y,"work")}
function is_define(x,y,z){
check(is_str,y)
check(is_str,z)
if(not(is_obj,x))
return false
if(different(x.operator,y))
return false
if(not(like_l,x.parameters,is_ident,z,is_coolic))
return false
const a=slice(x.parameters,2);
return every(a,is_coolic)}
function is_include(x){
if(not(is_obj,x))
return false
if(different(x.operator,"include"))
return false
return like_l(x.parameters,is_lit)}
function is_let_embed(x){
if(not(is_obj,x))
return false
if(different(x.operator,"let"))
return false
return like_l(x.parameters,is_ident,"embed",is_lit)}
function is_let_run(x){
return is_define_run(x,"let")}
function is_let_work(x){
return is_define_work(x,"let")}
function is_run(x){
if(not(is_obj,x))
return false
if(different(x.operator,"run"))
return false
if(is_empty(x.parameters))
return false
if(not(every,x.parameters,is_coolic))
return false
return true}
function is_sub_dir(x){
if(not(is_dir,x))
return false
for(const value of dir_read(x)){
if(is_file(value))
return false}
return true}
function is_var_run(x){
return is_define_run(x,"var")}
function is_var_work(x){
return is_define_work(x,"var")}
function is_work(x){
if(not(is_obj,x))
return false
if(different(x.operator,"work"))
return false
if(not(is_many,x.parameters))
return false
if(not(every,x.parameters,is_coolic))
return false
return true}
function let_embed(x,y){
check(is_str,x)
check(is_str,y)
const path=path_real(y);
log("embed",path)
const content=file_load(path);
const s=to_json(content);
const operator="let";
const parameters=[x,s];
const children=[];
return {operator,parameters,children}}
function let_run(x){
check(is_obj,x)
return define_run(x,"let")}
function let_work(x){
check(is_obj,x)
return define_work(x,"let")}
function to_arg(x){
if(is_lit(x))
return JSON.parse(x)
return x}
function var_run(x){
check(is_obj,x)
return define_run(x,"var")}
function var_work(x){
check(is_obj,x)
return define_work(x,"var")}
const cache_parse=memoize(parse);
const a=cache_parse(x);
const r=apply(a);
if(is_obj(r))
return [r]
return r}
function get_apps(){
const r=[];
const app=dir_locate("src/app");
for(const value of dir_read(app)){
const base=path_base(value);
if(is_app(base))
push(r,base)}
return r}
function get_local_apps(){
const a=get_apps();
return filter(a,is_local_app)}
function get_remote_apps(){
const a=get_apps();
return filter(a,is_remote_app)}
function is_app(x){
if(is_local_app(x))
return true
if(is_remote_app(x))
return true
return false}
const controls=[];
function is_control(x){
if(is_empty(controls)){
const v1="if elseif else forin fornum forof while";
const v2=split(v1," ");
append(controls,v2)}
return contain(controls,x)}
function is_local_app(x){
if(not(is_str,x))
return false
const app=dir_locate("src/app");
const main=path_concat(app,x,"local.rs");
return is_file(main)}
function is_remote_app(x){
if(not(is_str,x))
return false
const app=dir_locate("src/app");
const main=path_concat(app,x,"remote.rs");
return is_file(main)}
function rule_add(x,...y){
check(is_name,x)
const v=rule_rvalue(...y);
return concat(x,"+=",v)}
function rule_arr(...x){
check(every,x,is_term)
const v1=map(x,get_parameter);
const v2=join(v1,",");
return bracket(v2)}
function rule_assign(x,...y){
check(is_name,x)
const v=rule_rvalue(...y);
return concat(x,"=",v,";")}
function rule_begin(...x){
check(is_empty,x)
return ""}
function rule_brk(...x){
check(is_empty,x)
return "break"}
function rule_call(x,...y){
check(is_name,x)
check(every,y,is_parameter)
const v1=map(y,get_parameter);
const v2=join(v1,",");
const v3=paren(v2);
return concat(x,v3)}
function rule_catch(x){
if(is_undef(x))
return "catch"
check(is_ident,x)
const s=paren(x);
return concat("catch",s)}
function rule_cont(...x){
check(is_empty,x)
return "continue"}
function rule_dec(x,...y){
check(is_name,x)
check(is_empty,y)
return concat(x,"--")}
function rule_div(x,...y){
check(is_name,x)
const v=rule_rvalue(...y);
return concat(x,"/=",v)}
function rule_else(...x){
check(is_empty,x)
return "else"}
function rule_elseif(...x){
const v1=rule_rvalue(...x);
const v2=paren(v1);
return concat("else if",v2)}
function rule_finally(...x){
check(is_empty,x)
return "finally"}
function rule_fn(x,...y){
check(is_ident,x)
check(every,y,is_argument)
const v1=map(y,get_parameter);
const v2=join(v1,",");
const v3=paren(v2);
return concat("function ",x,v3)}
function rule_forin(...x){
const v=rule_rvalue(...x);
return concat("for(const key in ",v,")")}
function rule_fornum(...x){
const v=rule_rvalue(...x);
return concat("for(let key=0;key<",v,";key++)")}
function rule_forof(...x){
const v=rule_rvalue(...x);
return concat("for(const value of ",v,")")}
function rule_gn(x,...y){
check(is_ident,x)
check(every,y,is_argument)
const v1=map(y,get_parameter);
const v2=join(v1,",");
const v3=paren(v2);
return concat("function* ",x,v3)}
function rule_if(...x){
const v1=rule_rvalue(...x);
const v2=paren(v1);
return concat("if",v2)}
function rule_inc(x,...y){
check(is_name,x)
check(is_empty,y)
return concat(x,"++")}
function rule_inline(x,...y){
check(is_lit,x)
check(is_empty,y)
return JSON.parse(x)}
function rule_instanceof(x,...y){
check(is_ident,x)
const v=rule_rvalue(...y);
return concat(x," instanceof ",v)}
function rule_let(x,...y){
check(is_ident,x)
const v=rule_rvalue(...y);
return concat("const ",x,"=",v,";")}
function rule_mul(x,...y){
check(is_name,x)
const v=rule_rvalue(...y);
return concat(x,"*=",v)}
function rule_new(...x){
const v=rule_rvalue(...x);
return concat("new ",v)}
function rule_nop(...x){
check(is_empty,x)
return ";"}
function rule_obj(...x){
check(every,x,is_ident)
const v=join(x,",");
return brace(v)}
function rule_put(x,y,...z){
check(is_name,x)
check(is_val,y)
const v=rule_rvalue(...z);
const s=bracket(y);
return concat(x,s,"=",v)}
function rule_resume(...x){
const s=rule_rvalue(...x);
return concat("yield* ",s)}
function rule_ret(...x){
if(is_empty(x))
return "return"
const v=rule_rvalue(...x);
return concat("return ",v)}
function rule_rvalue(x,...y){
check(is_term,x)
if(same(x,"inline"))
return rule_inline(...y)
else if(same(x,"val"))
return rule_val(...y)
else if(same(x,"arr"))
return rule_arr(...y)
else if(same(x,"obj"))
return rule_obj(...y)
else if(same(x,"call"))
return rule_call(...y)
else if(same(x,"new"))
return rule_new(...y)
else if(same(x,"instanceof"))
return rule_instanceof(...y)
else if(is_nonic(x)){
check(is_empty,y)
return x}
else if(is_boolic(x)){
check(is_empty,y)
return x}
else if(is_numeric(x)){
check(is_empty,y)
return x}
else if(is_lit(x)){
check(is_empty,y)
return x}
else if(is_name(x)){
if(is_empty(y))
return x
return rule_call(x,...y)}
else
stop()}
function rule_sub(x,...y){
check(is_name,x)
const v=rule_rvalue(...y);
return concat(x,"-=",v)}
function rule_throw(...x){
const v=rule_rvalue(...x);
return concat("throw ",v)}
function rule_try(...x){
check(is_empty,x)
return "try"}
function rule_val(x,...y){
check(is_val,x)
check(is_empty,y)
return x}
function rule_var(x,...y){
check(is_ident,x)
const v=rule_rvalue(...y);
return concat("let ",x,"=",v,";")}
function rule_while(...x){
if(is_empty(x))
return rule_while("true")
const v1=rule_rvalue(...x);
const v2=paren(v1);
return concat("while",v2)}
function rule_yield(...x){
if(is_empty(x))
return "yield"
const s=rule_rvalue(...x);
return concat("yield ",s)}
function script_check(x){
trace("check",x)
const argv=process.argv;
const binary=front(argv);
const s=os_execute(binary,"-c",x);
if(is_full(s)){
log("out",s)
return false}
return true}
function script_run(x,...y){
check(is_file,x)
const binary=front(process.argv);
return os_system(binary,x,...y)}
function sh_inline(x){
check(is_str,x)
const binary=front(process.argv);
const shebang=concat("#!",binary);
return concat(shebang,"\n",x)}
function main(...x){
function get_app(x){
if(not(is_str,x))
return null
const prefix="--";
if(not(match_l,x,prefix))
return null
const r=strip_l(x,prefix);
if(not(is_app,r))
return null
return r}
function get_app_no(x){
if(not(is_str,x))
return null
const prefix="--no-";
if(not(match_l,x,prefix))
return null
const r=strip_l(x,prefix);
if(not(is_app,r))
return null
return r}
if(not(is_dir,"out"))
dir_make("out")
const arguments=dup(x);
const parameters=[];
const apps=[];
const apps_no=[];
let option_run=false;
while(is_full(arguments)){
const argument=shift(arguments);
const app=get_app(argument);
const app_no=get_app_no(argument);
if(is_str(app))
push(apps,app)
else if(is_str(app_no))
push(apps_no,app_no)
else if(same(argument,"--all")){
const a=get_apps();
append(apps,a)}
else if(same(argument,"--all-local")){
const a=get_local_apps();
append(apps,a)}
else if(same(argument,"--all-remote")){
const a=get_remote_apps();
append(apps,a)}
else if(same(argument,"--run")){
option_run=true;
append(parameters,arguments)
clear(arguments)}
else
push(parameters,argument)}
if(is_empty(apps)){
for(const value of get_apps()){
const flag=concat("--",value);
log("flag",flag)}
return}
for(const value of apps){
if(contain(apps_no,value))
log("skip",value)
else{
log("build",value)
app_build(value)}}
if(not(option_run))
return
for(const value of apps){
if(not(contain,apps_no,value)){
log("run",value)
app_run(value,...parameters)}}}
const _identifier="_ __filename _identifier _iterator _result_ _state app_build app_build_local app_build_remote app_dir app_no app_run apply_get apply_post apps_no cache_call cache_invalidate cache_load cache_merge cache_normalize cache_parse cache_path cache_save cache_untrivia cache_update child_process code_html code_identifiers code_js code_sh code_var con_construct con_init con_mute con_print con_time config_init curl_execute curl_init define_run define_work dir_copy dir_load dir_locate dir_make dir_match dir_origin dir_read dir_remove dir_reset dir_up env_continue env_init env_push env_tick evt_order evt_parameters evt_time file_append file_copy file_load file_locate file_read file_remove file_save file_size file_write fs_locate get_app get_app_no get_apps get_bsize get_cache get_call get_calls get_date get_fns get_frames get_globals get_hour get_identifiers get_keys get_line get_local_apps get_name get_nop get_now get_operation get_origin get_parameter get_pid get_random get_random_str get_remote_apps get_rvalue get_source get_source_offset get_stack get_time get_timestamp get_traces get_type get_values git_clean git_config git_download git_init git_upload git_work html_inline html_src http_listen include_dir include_file is_access is_alnum is_alpha is_app is_argument is_arr is_assign_perform is_blank is_bool is_boolic is_callable is_camel is_canonic is_chrome is_comment is_container is_control is_cool is_coolic is_def is_define is_define_perform is_define_run is_define_work is_digit is_dir is_dispensable is_empty is_etc is_false is_file is_firefox is_fn is_foreign is_friend is_fs is_full is_gn is_ident is_include is_int is_iterable is_iterator is_json is_key is_label is_let_embed is_let_perform is_let_run is_let_work is_lisp is_lit is_ln is_local is_local_app is_lower is_many is_name is_neg is_nl is_node is_none is_nonic is_null is_num is_numeric is_obj is_one is_pair is_parameter is_perform is_pos is_punct is_relative is_remote is_remote_app is_ret_perform is_run is_scope is_serializable is_single is_snake is_space is_str is_sub_dir is_sym is_task is_tbl is_term is_token is_true is_tuple is_two is_txt is_uint is_undef is_upper is_url is_v8 is_val is_var_perform is_var_run is_var_work is_vec is_word is_work is_zero last_result let_embed let_run let_work like_l match_l match_r on_exception on_exit on_monitor option_run os_execute os_launch os_open os_pipe os_spawn os_system os_work pad_l pad_r path_base path_concat path_dir path_ext path_join path_name path_real path_relative path_sep path_shorten path_split path_tmp path_unique rt_install rt_main rule_add rule_arr rule_assign rule_begin rule_brk rule_call rule_catch rule_cont rule_dec rule_div rule_else rule_elseif rule_finally rule_fn rule_forin rule_fornum rule_forof rule_gn rule_if rule_inc rule_inline rule_instanceof rule_let rule_mul rule_new rule_nop rule_obj rule_put rule_resume rule_ret rule_rvalue rule_sub rule_throw rule_try rule_val rule_var rule_while rule_yield script_check script_run sh_inline silent_compile slice_l slice_r source_offset strip_l strip_r tbl_convert tbl_order tbl_pad_l tbl_remove_column tbl_sort tbl_string terminal_peek time_prompt timer_deinit timer_fire timer_init timer_repeat to_arg to_dump to_fixed to_hexa to_int to_json to_lit to_lower to_num to_str to_uint to_upper trim_l trim_r txt_compact txt_inline txt_normalize url_base url_name var_identifier var_run var_work window_exist"
init()