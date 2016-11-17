(function() {

    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;

    var yew = function(obj) {
        if (obj instanceof yew) return obj;
        if (!(this instanceof yew)) return new yew(obj);
    };

    root.yew = yew;

    yew.mkdir = function(root, name) {
        // should probably check if exists
        var dir = {
            name: name,
            parent: root,
            children: [],
            files: [],
            type: "dir"
        };
        if (root) {
            root.children.push(dir);
        }
        return dir;
    }

    yew.touch = function(dir, filename) {
        // exists??? naahh
        var file = {
            name: filename,
            content: "",
            parent: dir,
            type: "file"
        };
        dir.files.push(file);
        return file;
    }

    yew.traverse = function(node, level, action) {
        action(node, level);
        if (node.type == 'dir') {
            node.files.forEach(function(child) {
                yew.traverse(child, level + 1, action);
            });
            node.children.forEach(function(child) {
                yew.traverse(child, level + 1, action);
            });
        }
    }

    yew.toLvlString = function(node, level) {
        var str = " ".repeat(level * 3) + node.name;
        if (node.children !== undefined) {
            str += "/";
        }
        return str;
    }

    yew.findDir = function(root, name) {
        return root.children ? root.children.find(function(n) {
            return n.name == name;
        }) : null;
    }

    yew.absolutePath = function(node) {
        var parent = node,
            sum = "";
        while (parent !== null) {
            sum = parent.name + "/" + sum;
            parent = parent.parent;
        }
        sum = "/" + sum;
        if (node.type == "file") sum = sum.slice(0, -1);
        return sum;
    }

    yew.find = function(root, level, cond) {

        if (cond(root)) {
            return root;
        }

        var child = null,
            file = null;

        if (root.children) {
            for (var i = 0; i < root.children.length; i++) {
                var result = yew.find(root.children[i], level + 1, cond);
                if (result) return result;
            }
        }

        if (root.files) {
            for (var j = 0; j < root.files.length; j++) {
                var found = yew.find(root.files[j], level + 1, cond);
                if (found) return found;
            }
        }

        return null;
    }

    yew.nameContains = function(name) {
        return function(node) {
            return node ? node.name.includes(name) : false;
        }
    }

    yew.absPathIs = function(path) {
        return function(node) {
            return node ? yew.absolutePath(node) === path : false;
        }
    }

}());