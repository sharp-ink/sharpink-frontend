/**
 * @license Copyright (c) 2014-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';

export default class CustomEditor extends ClassicEditor {}

// Plugins to include in the build.
CustomEditor.builtinPlugins = [
	Essentials,
	Alignment,
	Autoformat,
	Autosave,
	BlockQuote,
	Bold,
	HorizontalLine,
	Indent,
	IndentBlock,
	Italic,
	Paragraph,
	PasteFromOffice,
	Underline,
	WordCount
];

CustomEditor.defaultConfig = {
	locale: 'fr',
	toolbar: ['bold', 'italic', 'underline', '|', 'alignment:left', 'alignment:center', 'alignment:right', '|', 'indent', 'outdent', '|', 'undo', 'redo' ]
};

