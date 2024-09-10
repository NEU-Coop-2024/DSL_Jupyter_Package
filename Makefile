all: clean init run

syntax_highlighting/node_modules/hypl_syntax:
	cd syntax_highlighting && jlpm add hypl_syntax@git@github.com:NEU-Coop-2024/hypl_syntax.git

.venv:
	python3 -m venv .venv
	.venv/bin/activate

.PHONY: clean
clean:
	cd syntax_highlighting && jlpm remove hypl_syntax

.PHONY: build .venv
build: .init syntax_highlighting/node_modules/hypl_syntax
	chmod +x .venv/bin/activate
	.venv/bin/activate
	pip install -ve syntax_highlighting
	cd syntax_highlighting && jlpm run build
	chmod -x .venv/bin/activate

.PHONY: run
run: build
	jupyter notebook --port 8888 --no-browser

.PHONY: init
init: .venv .init
	chmod +x .venv/bin/activate
	./venv/bin/activate
	poetry install
	chmod -x .venv/bin/activate

.init:
	touch .init

