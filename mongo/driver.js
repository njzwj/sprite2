var nojdb = require("./nojdb");

function showerr(err, object) {
    if (err == null) {
        console.log(object);
    } else {
        console.log(err);
    }
}

function trunk(callback) {
    return function(err, object) {
        showerr(err, object);
        callback();
    }
}

nojdb.admin.create({
    id: 1234,
    username: 'p1',
    password: 'pwd',
    type: 1
}, trunk(function() {
    nojdb.admin.create({
        id: 5678,
        // 少了一个
        password: 'pwd',
        type: 1
    }, trunk(
        function() {
            nojdb.admin.findOne({
                id: 1234
            }, trunk(
                function() {
                    nojdb.admin.findOne({
                        id: 4567
                    }, trunk(
                        function() {
                            nojdb.admin.findOne({
                                    id: 1234
                                },
                                function(err, object) {
                                    if (err == null) {
                                        console.log('用户名：' + object.username);
                                    }

                                    // 可以就地修改找到的文档并保存
                                    object.type = 2333;
                                    object.save(function(err, obj) {
                                        console.log("现在type 是" + obj.id);
                                    });

                                    // callback 运行下一步
                                    nojdb.admin.update({
                                        id: 1234
                                    }, {
                                        $set: {
                                            password: 'newpwd'
                                        }
                                    }, trunk(
                                        function() {
                                            nojdb.admin.remove({
                                                id: 1234
                                            }, showerr);
                                        }));
                                });
                        }));
                }));
        }));
}));
