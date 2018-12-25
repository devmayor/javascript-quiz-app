const expect = require('expect');
const calculus = require('./calculus');


it("Should return 3 as a number",()=>{
    var res = calculus.add(1,2);
    
    expect(res).toBe(3).toBeA('number');
    
});
it("Should return object with first name and last name", ()=>{
    let user = {
        'age' : 23
    }
    let fullname = "Ajao Rush";
    let userReturned = calculus.setName(user , fullname);
    
    expect(userReturned).toInclude({ firstName : "Ajao"}).toInclude({lastName : "Rush"});
  
  })

  it("Should return 50 ",(done)=>{
      var addNum = calculus.asyncAdd(25 , 25 , (resp)=>{
          expect(resp).toBe(50).toBeA('number');
        done();
      })
  })
  
