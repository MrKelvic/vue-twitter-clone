module.exports = {
    search(q, data) {
        //dataParser.search(q,this.$store.state.jobs)
        let res = [];
        let tests = ['comp', 'location', 'pay', 'title', 'type'];
        let testEq = ['company name', 'location', 'pay', 'job title', 'job type']
        for (let m = 0; m < data.length; ++m) {
            for (let x = 0; x < q.length; ++x) {
                for (let i = 0; i < tests.length; ++i) {
                    if (data[m][tests[i]].toLowerCase().indexOf(q[x].toLowerCase()) != -1) {
                        if (res.findIndex(e => e.id == data[m].id) == -1) {
                            res.push(Object.assign({ where: `${testEq[i]} ${data[m][tests[i]].substring(0,5)}...` }, data[m]))
                        }
                    }
                }
            }
        }
        return res;
    }
}