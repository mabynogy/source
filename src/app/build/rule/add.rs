fn rule_add x y:etc
 check is_name x
 
 let v rule_rvalue y:etc

 ret concat x "+=" v
end
