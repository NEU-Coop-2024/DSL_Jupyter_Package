all: clean init run

.venv:
	python3 -m venv .venv

.PHONY: init build .venv

init: .venv
	chmod +x .venv/bin/activate
	. .venv/bin/activate && poetry install
	. .venv/bin/activate && lezer-generator ./syntax_highlighting/src/syntax.grammar -o ./syntax_highlighting/src/parser.ts
	. .venv/bin/activate && pip install -ve syntax_highlighting
	. .venv/bin/activate && cd syntax_highlighting && jlpm run build
	chmod -x .venv/bin/activate

build: .venv
	chmod +x .venv/bin/activate
	. .venv/bin/activate && lezer-generator ./syntax_highlighting/src/syntax.grammar -o ./syntax_highlighting/src/parser.ts
	. .venv/bin/activate && pip install -ve syntax_highlighting
	. .venv/bin/activate && cd syntax_highlighting && jlpm run build
	chmod -x .venv/bin/activate

.PHONY: run
run:
	jupyter notebook --port 8888 --no-browser
