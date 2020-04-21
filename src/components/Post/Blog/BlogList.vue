<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" sm="7" md="8" lg="8" xl="7" offset-xl="1" class="pt-0">
         <h1 v-if="showTitlePage" class="mt-5">#Blogs</h1>
        <blog
          v-for="item in blogs"
          :key="item._id"
          :_id="item._id"
          :topic="item.topic"
          :description="item.description"
          :content="item.content"
          :tags="item.tags"
          :cover="item.cover"
          :userId="item.userId"
          :type="item.type"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          :metadata="item.metadata"
        ></blog>
        <v-container class="mt-5 d-flex justify-center" v-if="showViewMoreBtn">
          <v-btn class="primary" to="/stream/blogs">View more</v-btn>
        </v-container>
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4" xl="4" :style="sideBarStyle">
        <side-card
          class="fix-sidebar top-blogger"
          :title="topBloggers.title"
          :type="topBloggers.type"
          :data="topBloggers.data"
          v-if="showTopBloggers"
        ></side-card>

        <side-card
          class="fix-sidebar most-view-posts"
          :title="mostViewBlogs.title"
          :type="mostViewBlogs.type"
          :data="mostViewBlogs.data"
        ></side-card>

        <side-card class="fix-sidebar" :title="tags.title" :type="tags.type" :data="tags.data"></side-card>

        <side-card
          class="fix-sidebar member-online"
          :title="membersOnline.title"
          :type="membersOnline.type"
          :data="membersOnline.data"
        ></side-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Blog from "./Blog";
import SideCard from "@/components/Shared/SideCard";
export default {
  components: {
    Blog,
    SideCard
  },
  data() {
    return {
      showTitlePage: false,
      showViewMoreBtn: true,
      blogs: [
        {
          _id: "5e9ab00f0591fb40fc87faa2",
          tags: [
            {
              _id: "5e8ddf319ac8ee2dd68b1cd7",
              tagName: "coercion"
            },
            {
              _id: "5e8cb5562ded8236f29fc885",
              tagName: "nhatanh"
            }
          ],
          comments: [],
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde3229879524",
            username: "nhat_anh"
          },
          topic: "Bạn chưa hiểu JavaScript đâu kỳ 2 - Coercion",
          description:
            "Tại sao mọi người lại  thích rời khỏi nhà và vác ba lô đi khắp thế giới đến như vậy ? Lý do thì muôn trùng không thể đếm xuể. Đôi khi lý do cũng rất khác biệt. Nhưng hãy xem 10 lý do mà tôi liệt kê dưới đây,để xem cái nào đúng nhất với bạn nhé.",
          content:
            'Search Google với từ khóa coercion trong javascript rồi dạo một lượt tầm hơn chục bài tiếng việt nằm trên top mà mình tá hoảng khi chỉ có duy nhất 2 bài là nội dung tạm được và có trích dẫn nguồn. Còn lại đều mắc rất nhiều lỗi về cả nội dung lẫn dịch thuật. Vì vậy, để giúp các bạn có cái nhìn chính xác từ gốc tới ngọn, thay vì tung bài về this theo kế hoạch, mình đã quyết định viết thêm bài về Coercion. Và chắc bạn cũng đoán được chủ đề của Series Bạn chưa hiểu JavaScript đâu kỳ này là gì rồi nhỉ? Một, hai, ba, tẩy não thôi.\n\nNếu bạn chưa đọc bài Bạn chưa hiểu JavaScript đâu kỳ 1 - Scopes và Hoisting viết về bộ ba quyền lực trong JavaScript thì mình khuyên các bạn nên đọc nó trước tại đây.\n\nNhắc lại về kiểu dữ liệu trong JavaScript\nPrimitive Data Types\nKiểu dữ liệu được gọi là Primitive là kiểu dữ liệu không phải object và không có methods. Có 7 primitive types bao gồm:\n\nNumber\nString\nBoolean\nNull\nUndefined\nSymbol\nBigInt: một built-in object được tạo để biểu diễn whole numbers (số nguyên dương và số 0) có giá trị lớn hơn 2^53.\nBạn có thể đọc thêm về primitive types ở MDN documentation.\n\nNon-primitive Data Types\nĐọc tên thì cũng biết là đây là tập hợp kiểu dữ liệu nằm ngoài 7 kiểu ở trên.\n\nObject\nLưu ý: Array và Function được coi là subtype của Object (nhóm con), chứ nó không được coi như type của JavaScript. (Thắc mắc thì coi lại MDN documentation.)\n\nCoercion là gì?\nCoercion dịch từ anh ra việt nghĩa là sự ép buộc, bắt buộc làm gì đó.\n\nCoercion meaning\n\nTrong JavaScript, coercion (hay còn gọi là type conversion) được hiểu là việc biến đổi (convert) từ kiểu dữ liệu này sang kiểu dữ liệu khác trong quá trình thực hiện chương trình.\n\nTrong ví dụ dưới, ở vế trước, string “10” được đổi kiểu dữ liệu từ string thành number, rồi JavaScript Engine mới thực hiện so sánh giá trị hai vế với nhau.\n\n"10" == 10; // true => String bằng được Number. Lạ nhỉ???\nLưu ý, trong quá trình dịch, mình dùng từ đổi kiểu dữ liệu thay vì từ ép kiểu dữ liệu như số đông. Chỉ là thay đổi ngôn từ để các bạn dễ hiểu thay vì dịch kiểu Google translate và lạm dùng từ hán việt hại não các bạn.\n\nCoercion hoạt động như thế nào?\nĐây là thứ tự chạy của Engine trong == (cho phép coercion):\n\nĐổi sang Primitive Form nếu không phải Primitive Type.\nCheck xem cùng kiểu dữ liệu chưa? Nếu chưa, Engine thì sẽ ưu tiên đổi 2 vế thành Number (nếu có thể). Nếu rồi, nhảy qua bước 3.\nSo sánh giá trị.\nTrả về kết quả bằng true hoặc false.\nXét đoạn chương trình sau:\n\nvar codersX1 = 10;\nvar codersX2 = [10];\n\nif (codersX1 == codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == codersX2)\n\n * if (10 == [10]) => thực hiện ToPrimitive([10]), biến [10] thành "10"\n\n * if (10 == "10") => Vế trái có type là Number, nên vế phải sẽ được ưu tiên đổi sang Number, \n * "10" biến thành 10\n\n * if (10 === 10) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n\n * if (true) => giá trị bằng nhau nên trả về true\n */\nNhầm lẫn giữa == và ===\nMình xin phép giải thích thuật ngữ trước khi phân tích tiếp.\n\nThe ECMAScript specification (gọi tắt là ECMAScript hay ngắn gọn hơn nữa là specification - đây cũng là từ mình dùng trong bài này) là bộ tiêu chuẩn chung, hiểu đại khái như pháp luật của nước JavaScript, buộc mọi công dân trong lãnh thổ JavaScript phải tuân theo, phá luật, gặp bugs là tèo.\n\nCheck type và không check type?\nNhiều người vì không hiểu bản chất của JavaScript (có thể do lười đọc specification) mà nhầm rằng sự khác nhau giữa == và === là:\n\n== không check kiểu dữ liệu, chỉ so sánh giá trị, trong khi === check kiểu dữ liệu rồi mới so sánh giá trị.\n\nMình xin khẳng định lại một lần nữa là KHÔNG PHẢI nhé. Mà phải là:\n\n== cho phép coercion (đổi kiểu dữ liệu).\n=== không cho phép coercion (đổi kiểu dữ liệu).\nNói có sách mách có chứng\n\nMình đã đọc đi đọc lại vài lượt specification của JavaScript rồi nên mình mạnh mồm lắm.\n\nOK, giờ bạn hãy nhìn vào mục 1 của specification về ==.\n\nAbstract Equality Comparison\n\nIf Type(x) is the same as Type(y), then Return the result of performing Strict Equality Comparison x === y.\nTạm dịch là Nếu hai thằng x và y có cùng type thì chuyển sang so sánh “===”. Còn lại thì xuống mục 2 check tiếp.\n\nƠ, nó cũng check type kìa anh em.\n\nNhìn tiếp vào mục 1 của specification về ===.\n\nStrict Equality Comparison\n\nIf Type(x) is different from Type(y), return false.\nTạm dịch là Nếu hai thằng x và y khác type thì trả về false. Còn lại thì xuống mục 2 check tiếp.\n\nOooh, vậy là cả hai thằng này đều check type hết chỉ có behaviors (hành vi) của chúng nó khác nhau sau khi check type thôi.\n\nTránh == nhiều nhất có thể?\nThứ nhất, đầy là một nhận định sai lầm lại do lười đọc specification của JavaScript. Như hướng dẫn của specification thì nếu x và y có cùng kiểu dữ liệu thì dù là == hay === đều như nhau hết.\n\nThứ hai, tại sao lại phải dùng === (có thể tốn thời gian thêm bước type conversion) mà không dùng luôn == với những thứ bạn đã biết rõ kiểu dữ liệu?\n\nThứ ba, việc dùng bừa bãi == và === chứng tỏ bạn không hiểu mình đang code cái gì. Bằng chứng là bạn đâu có nắm rõ được kiểu dữ liệu của biến trong chương trình.\n\nSau đây là quy tắc dùng == và ===:\n\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh.\n// Ví dụ 1\nvar x = {};\n\nif (x === null && x === undefined) {\n  // Do something ...\n}\n// Ví dụ 2\nvar x = {};\n\nif (x == null) {\n  // Do something ...\n}\n\n/**\n * Với `==`, null == underfined và ngược lại.\n * Cho nên, nếu giá trị của x bằng null hoặc undefined\n * thì việc so sánh là như nhau,\n * chương trình trông sáng sủa hơn.\n */\nCác trường hợp còn lại dùng ===\nJavaScript lạ chưa! @_@\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself)\n[] == ![]; // true ??? - so sánh với giá trị phụ định\n[] != []; // true\nvar codersX1 = [];\nvar codersX2 = [];\n\nif (codersX1 == !codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == !codersX2)\n * if ([] == ![]) => Thực hiện biến đổi ![] thành `false`\n * if ([] == false) => Thực hiện biến đổi [] thành ""\n * if ("" == false) => Thực hiện biến đổi "" thành 0 và `false` thành 0\n * if (0 === 0) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n * if (true) => giá trị bằng nhau nên trả về `true`\n */\n\nif (codersX1 != codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 != codersX2)\n * if (!(codersX1 == codersX2)) => `codersX1 == codersX2` trả về `false`\n * if (!(false))\n * if (true)\n */\nTổng kết\nCác kiểu dữ liệu trong JavaScript bao gồm Primitive Types (number, string, boolean, null, undefined, symbol, bigInt) và Non-Primitive Types (object).\nArray và Function được coi là subtype của Object (nhóm con).\n== cho phép coercion (đổi kiểu dữ liệu) trong khi === không cho phép coercion (đổi kiểu dữ liệu).\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh. Các trường hợp còn lại dùng ===\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself).\nBài tập cho bạn\nYêu cầu: Đọc đề bài ở file README. Sau đó, mở file index.js làm bài. Cuối cùng, xem đáp án ở file index.fixed.js. Có phần test ở cuối bài.\n\nEm Linh đây: https://repl.it/@Nhat_AnhAnh/CoercionExercises\n\nNếu tất cả là true thì là đúng hết. Làm được bài này các bạn sẽ học được rất nhiều thứ nên nếu ngồi cả ngày mà làm chưa đúng hết thì cứ làm tiếp nhé.\n\nTài liệu tham khảo\nKhóa Deep JS Foundations V3 của Kyle Simpson\nTập 4 Types and Grammar - You don’t know JS của Kyle Simpson\nAbstract Equality Comparison: ECMA-262, 9th edition, June 2018\nStrict Equality Comparison: ECMA-262, 9th edition, June 2018\nType conversion: ECMA-262, 9th edition, June 2018\nMDN documentation về Data Types\nNếu bạn có phần nào chưa rõ hay muốn trao đổi thêm với mình, đừng ngần ngại inbox mình nhé. Chúc các bạn đọc vui.\n\nNếu bạn muốn có nhiều cơ hội trải nghiệm hơn, hãy tham gia cộng đồng học lập trình miễn phí CodersX với chúng mình. Together, we change the world.',
          type: "blog",
          createdAt: "2020-04-18T07:45:19.846Z",
          updatedAt: "2020-04-18T07:45:19.846Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e9b00f0591fb40fc87faa2",
          tags: [
            {
              _id: "5e8ddf319ac8ee2dd68b1cd7",
              tagName: "coercion"
            },
            {
              _id: "5e8cb5562ded8236f29fc885",
              tagName: "nhatanh"
            }
          ],
          comments: [],
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde3229879524",
            username: "nhat_anh"
          },
          topic: "Bạn chưa hiểu JavaScript đâu kỳ 2 - Coercion",
          description:
            "Search Google với từ khóa coercion trong javascript rồi dạo một lượt tầm hơn chục bài tiếng việt nằm trên top mà mình tá hoảng khi chỉ có duy nhất 2 bài là nội dung tạm được và có trích dẫn nguồn. Còn lại đều mắc rất nhiều lỗi về cả nội dung lẫn dịch thuật. Vì vậy, để giúp các bạn có cái nhìn chính xác từ gốc tới ngọn, thay vì tung bài về this theo kế hoạch, mình đã quyết định viết thêm bài về Coercion. Và chắc bạn cũng đoán được chủ đề của Series Bạn chưa hiểu JavaScript đâu kỳ này là gì rồi nhỉ? Một, hai, ba, tẩy não thôi.",
          content:
            'Search Google với từ khóa coercion trong javascript rồi dạo một lượt tầm hơn chục bài tiếng việt nằm trên top mà mình tá hoảng khi chỉ có duy nhất 2 bài là nội dung tạm được và có trích dẫn nguồn. Còn lại đều mắc rất nhiều lỗi về cả nội dung lẫn dịch thuật. Vì vậy, để giúp các bạn có cái nhìn chính xác từ gốc tới ngọn, thay vì tung bài về this theo kế hoạch, mình đã quyết định viết thêm bài về Coercion. Và chắc bạn cũng đoán được chủ đề của Series Bạn chưa hiểu JavaScript đâu kỳ này là gì rồi nhỉ? Một, hai, ba, tẩy não thôi.\n\nNếu bạn chưa đọc bài Bạn chưa hiểu JavaScript đâu kỳ 1 - Scopes và Hoisting viết về bộ ba quyền lực trong JavaScript thì mình khuyên các bạn nên đọc nó trước tại đây.\n\nNhắc lại về kiểu dữ liệu trong JavaScript\nPrimitive Data Types\nKiểu dữ liệu được gọi là Primitive là kiểu dữ liệu không phải object và không có methods. Có 7 primitive types bao gồm:\n\nNumber\nString\nBoolean\nNull\nUndefined\nSymbol\nBigInt: một built-in object được tạo để biểu diễn whole numbers (số nguyên dương và số 0) có giá trị lớn hơn 2^53.\nBạn có thể đọc thêm về primitive types ở MDN documentation.\n\nNon-primitive Data Types\nĐọc tên thì cũng biết là đây là tập hợp kiểu dữ liệu nằm ngoài 7 kiểu ở trên.\n\nObject\nLưu ý: Array và Function được coi là subtype của Object (nhóm con), chứ nó không được coi như type của JavaScript. (Thắc mắc thì coi lại MDN documentation.)\n\nCoercion là gì?\nCoercion dịch từ anh ra việt nghĩa là sự ép buộc, bắt buộc làm gì đó.\n\nCoercion meaning\n\nTrong JavaScript, coercion (hay còn gọi là type conversion) được hiểu là việc biến đổi (convert) từ kiểu dữ liệu này sang kiểu dữ liệu khác trong quá trình thực hiện chương trình.\n\nTrong ví dụ dưới, ở vế trước, string “10” được đổi kiểu dữ liệu từ string thành number, rồi JavaScript Engine mới thực hiện so sánh giá trị hai vế với nhau.\n\n"10" == 10; // true => String bằng được Number. Lạ nhỉ???\nLưu ý, trong quá trình dịch, mình dùng từ đổi kiểu dữ liệu thay vì từ ép kiểu dữ liệu như số đông. Chỉ là thay đổi ngôn từ để các bạn dễ hiểu thay vì dịch kiểu Google translate và lạm dùng từ hán việt hại não các bạn.\n\nCoercion hoạt động như thế nào?\nĐây là thứ tự chạy của Engine trong == (cho phép coercion):\n\nĐổi sang Primitive Form nếu không phải Primitive Type.\nCheck xem cùng kiểu dữ liệu chưa? Nếu chưa, Engine thì sẽ ưu tiên đổi 2 vế thành Number (nếu có thể). Nếu rồi, nhảy qua bước 3.\nSo sánh giá trị.\nTrả về kết quả bằng true hoặc false.\nXét đoạn chương trình sau:\n\nvar codersX1 = 10;\nvar codersX2 = [10];\n\nif (codersX1 == codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == codersX2)\n\n * if (10 == [10]) => thực hiện ToPrimitive([10]), biến [10] thành "10"\n\n * if (10 == "10") => Vế trái có type là Number, nên vế phải sẽ được ưu tiên đổi sang Number, \n * "10" biến thành 10\n\n * if (10 === 10) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n\n * if (true) => giá trị bằng nhau nên trả về true\n */\nNhầm lẫn giữa == và ===\nMình xin phép giải thích thuật ngữ trước khi phân tích tiếp.\n\nThe ECMAScript specification (gọi tắt là ECMAScript hay ngắn gọn hơn nữa là specification - đây cũng là từ mình dùng trong bài này) là bộ tiêu chuẩn chung, hiểu đại khái như pháp luật của nước JavaScript, buộc mọi công dân trong lãnh thổ JavaScript phải tuân theo, phá luật, gặp bugs là tèo.\n\nCheck type và không check type?\nNhiều người vì không hiểu bản chất của JavaScript (có thể do lười đọc specification) mà nhầm rằng sự khác nhau giữa == và === là:\n\n== không check kiểu dữ liệu, chỉ so sánh giá trị, trong khi === check kiểu dữ liệu rồi mới so sánh giá trị.\n\nMình xin khẳng định lại một lần nữa là KHÔNG PHẢI nhé. Mà phải là:\n\n== cho phép coercion (đổi kiểu dữ liệu).\n=== không cho phép coercion (đổi kiểu dữ liệu).\nNói có sách mách có chứng\n\nMình đã đọc đi đọc lại vài lượt specification của JavaScript rồi nên mình mạnh mồm lắm.\n\nOK, giờ bạn hãy nhìn vào mục 1 của specification về ==.\n\nAbstract Equality Comparison\n\nIf Type(x) is the same as Type(y), then Return the result of performing Strict Equality Comparison x === y.\nTạm dịch là Nếu hai thằng x và y có cùng type thì chuyển sang so sánh “===”. Còn lại thì xuống mục 2 check tiếp.\n\nƠ, nó cũng check type kìa anh em.\n\nNhìn tiếp vào mục 1 của specification về ===.\n\nStrict Equality Comparison\n\nIf Type(x) is different from Type(y), return false.\nTạm dịch là Nếu hai thằng x và y khác type thì trả về false. Còn lại thì xuống mục 2 check tiếp.\n\nOooh, vậy là cả hai thằng này đều check type hết chỉ có behaviors (hành vi) của chúng nó khác nhau sau khi check type thôi.\n\nTránh == nhiều nhất có thể?\nThứ nhất, đầy là một nhận định sai lầm lại do lười đọc specification của JavaScript. Như hướng dẫn của specification thì nếu x và y có cùng kiểu dữ liệu thì dù là == hay === đều như nhau hết.\n\nThứ hai, tại sao lại phải dùng === (có thể tốn thời gian thêm bước type conversion) mà không dùng luôn == với những thứ bạn đã biết rõ kiểu dữ liệu?\n\nThứ ba, việc dùng bừa bãi == và === chứng tỏ bạn không hiểu mình đang code cái gì. Bằng chứng là bạn đâu có nắm rõ được kiểu dữ liệu của biến trong chương trình.\n\nSau đây là quy tắc dùng == và ===:\n\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh.\n// Ví dụ 1\nvar x = {};\n\nif (x === null && x === undefined) {\n  // Do something ...\n}\n// Ví dụ 2\nvar x = {};\n\nif (x == null) {\n  // Do something ...\n}\n\n/**\n * Với `==`, null == underfined và ngược lại.\n * Cho nên, nếu giá trị của x bằng null hoặc undefined\n * thì việc so sánh là như nhau,\n * chương trình trông sáng sủa hơn.\n */\nCác trường hợp còn lại dùng ===\nJavaScript lạ chưa! @_@\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself)\n[] == ![]; // true ??? - so sánh với giá trị phụ định\n[] != []; // true\nvar codersX1 = [];\nvar codersX2 = [];\n\nif (codersX1 == !codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == !codersX2)\n * if ([] == ![]) => Thực hiện biến đổi ![] thành `false`\n * if ([] == false) => Thực hiện biến đổi [] thành ""\n * if ("" == false) => Thực hiện biến đổi "" thành 0 và `false` thành 0\n * if (0 === 0) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n * if (true) => giá trị bằng nhau nên trả về `true`\n */\n\nif (codersX1 != codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 != codersX2)\n * if (!(codersX1 == codersX2)) => `codersX1 == codersX2` trả về `false`\n * if (!(false))\n * if (true)\n */\nTổng kết\nCác kiểu dữ liệu trong JavaScript bao gồm Primitive Types (number, string, boolean, null, undefined, symbol, bigInt) và Non-Primitive Types (object).\nArray và Function được coi là subtype của Object (nhóm con).\n== cho phép coercion (đổi kiểu dữ liệu) trong khi === không cho phép coercion (đổi kiểu dữ liệu).\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh. Các trường hợp còn lại dùng ===\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself).\nBài tập cho bạn\nYêu cầu: Đọc đề bài ở file README. Sau đó, mở file index.js làm bài. Cuối cùng, xem đáp án ở file index.fixed.js. Có phần test ở cuối bài.\n\nEm Linh đây: https://repl.it/@Nhat_AnhAnh/CoercionExercises\n\nNếu tất cả là true thì là đúng hết. Làm được bài này các bạn sẽ học được rất nhiều thứ nên nếu ngồi cả ngày mà làm chưa đúng hết thì cứ làm tiếp nhé.\n\nTài liệu tham khảo\nKhóa Deep JS Foundations V3 của Kyle Simpson\nTập 4 Types and Grammar - You don’t know JS của Kyle Simpson\nAbstract Equality Comparison: ECMA-262, 9th edition, June 2018\nStrict Equality Comparison: ECMA-262, 9th edition, June 2018\nType conversion: ECMA-262, 9th edition, June 2018\nMDN documentation về Data Types\nNếu bạn có phần nào chưa rõ hay muốn trao đổi thêm với mình, đừng ngần ngại inbox mình nhé. Chúc các bạn đọc vui.\n\nNếu bạn muốn có nhiều cơ hội trải nghiệm hơn, hãy tham gia cộng đồng học lập trình miễn phí CodersX với chúng mình. Together, we change the world.',
          type: "blog",
          cover: {
            _id: "5e9ab00f0591fb40fc87faa3",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587195917/Coders-Tokyo-Forum/posts/javascript.png.png",
            publicId: "Coders-Tokyo-Forum/posts/javascript.png",
            fileName: "javascript.png",
            sizeBytes: 316358,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9ab00f0591fb40fc87faa2",
            resourceType: "image",
            createdAt: "2020-04-18T07:45:19.838Z",
            updatedAt: "2020-04-18T07:45:19.838Z",
            __v: 0
          },
          createdAt: "2020-04-18T07:45:19.846Z",
          updatedAt: "2020-04-18T07:45:19.846Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e9b00f091fb40fc87faa2",
          tags: [
            {
              _id: "5e8ddf319ac8ee2dd68b1cd7",
              tagName: "coercion"
            },
            {
              _id: "5e8cb5562ded8236f29fc885",
              tagName: "nhatanh"
            }
          ],
          comments: [],
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde3229879524",
            username: "nhat_anh"
          },
          topic: "Bạn chưa hiểu JavaScript đâu kỳ 2 - Coercion",
          description:
            "Search Google với từ khóa coercion trong javascript rồi dạo một lượt tầm hơn chục bài tiếng việt nằm trên top mà mình tá hoảng khi chỉ có duy nhất 2 bài là nội dung tạm được và có trích dẫn nguồn. Còn lại đều mắc rất nhiều lỗi về cả nội dung lẫn dịch thuật. Vì vậy, để giúp các bạn có cái nhìn chính xác từ gốc tới ngọn, thay vì tung bài về this theo kế hoạch, mình đã quyết định viết thêm bài về Coercion. Và chắc bạn cũng đoán được chủ đề của Series Bạn chưa hiểu JavaScript đâu kỳ này là gì rồi nhỉ? Một, hai, ba, tẩy não thôi.",
          content:
            'Search Google với từ khóa coercion trong javascript rồi dạo một lượt tầm hơn chục bài tiếng việt nằm trên top mà mình tá hoảng khi chỉ có duy nhất 2 bài là nội dung tạm được và có trích dẫn nguồn. Còn lại đều mắc rất nhiều lỗi về cả nội dung lẫn dịch thuật. Vì vậy, để giúp các bạn có cái nhìn chính xác từ gốc tới ngọn, thay vì tung bài về this theo kế hoạch, mình đã quyết định viết thêm bài về Coercion. Và chắc bạn cũng đoán được chủ đề của Series Bạn chưa hiểu JavaScript đâu kỳ này là gì rồi nhỉ? Một, hai, ba, tẩy não thôi.\n\nNếu bạn chưa đọc bài Bạn chưa hiểu JavaScript đâu kỳ 1 - Scopes và Hoisting viết về bộ ba quyền lực trong JavaScript thì mình khuyên các bạn nên đọc nó trước tại đây.\n\nNhắc lại về kiểu dữ liệu trong JavaScript\nPrimitive Data Types\nKiểu dữ liệu được gọi là Primitive là kiểu dữ liệu không phải object và không có methods. Có 7 primitive types bao gồm:\n\nNumber\nString\nBoolean\nNull\nUndefined\nSymbol\nBigInt: một built-in object được tạo để biểu diễn whole numbers (số nguyên dương và số 0) có giá trị lớn hơn 2^53.\nBạn có thể đọc thêm về primitive types ở MDN documentation.\n\nNon-primitive Data Types\nĐọc tên thì cũng biết là đây là tập hợp kiểu dữ liệu nằm ngoài 7 kiểu ở trên.\n\nObject\nLưu ý: Array và Function được coi là subtype của Object (nhóm con), chứ nó không được coi như type của JavaScript. (Thắc mắc thì coi lại MDN documentation.)\n\nCoercion là gì?\nCoercion dịch từ anh ra việt nghĩa là sự ép buộc, bắt buộc làm gì đó.\n\nCoercion meaning\n\nTrong JavaScript, coercion (hay còn gọi là type conversion) được hiểu là việc biến đổi (convert) từ kiểu dữ liệu này sang kiểu dữ liệu khác trong quá trình thực hiện chương trình.\n\nTrong ví dụ dưới, ở vế trước, string “10” được đổi kiểu dữ liệu từ string thành number, rồi JavaScript Engine mới thực hiện so sánh giá trị hai vế với nhau.\n\n"10" == 10; // true => String bằng được Number. Lạ nhỉ???\nLưu ý, trong quá trình dịch, mình dùng từ đổi kiểu dữ liệu thay vì từ ép kiểu dữ liệu như số đông. Chỉ là thay đổi ngôn từ để các bạn dễ hiểu thay vì dịch kiểu Google translate và lạm dùng từ hán việt hại não các bạn.\n\nCoercion hoạt động như thế nào?\nĐây là thứ tự chạy của Engine trong == (cho phép coercion):\n\nĐổi sang Primitive Form nếu không phải Primitive Type.\nCheck xem cùng kiểu dữ liệu chưa? Nếu chưa, Engine thì sẽ ưu tiên đổi 2 vế thành Number (nếu có thể). Nếu rồi, nhảy qua bước 3.\nSo sánh giá trị.\nTrả về kết quả bằng true hoặc false.\nXét đoạn chương trình sau:\n\nvar codersX1 = 10;\nvar codersX2 = [10];\n\nif (codersX1 == codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == codersX2)\n\n * if (10 == [10]) => thực hiện ToPrimitive([10]), biến [10] thành "10"\n\n * if (10 == "10") => Vế trái có type là Number, nên vế phải sẽ được ưu tiên đổi sang Number, \n * "10" biến thành 10\n\n * if (10 === 10) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n\n * if (true) => giá trị bằng nhau nên trả về true\n */\nNhầm lẫn giữa == và ===\nMình xin phép giải thích thuật ngữ trước khi phân tích tiếp.\n\nThe ECMAScript specification (gọi tắt là ECMAScript hay ngắn gọn hơn nữa là specification - đây cũng là từ mình dùng trong bài này) là bộ tiêu chuẩn chung, hiểu đại khái như pháp luật của nước JavaScript, buộc mọi công dân trong lãnh thổ JavaScript phải tuân theo, phá luật, gặp bugs là tèo.\n\nCheck type và không check type?\nNhiều người vì không hiểu bản chất của JavaScript (có thể do lười đọc specification) mà nhầm rằng sự khác nhau giữa == và === là:\n\n== không check kiểu dữ liệu, chỉ so sánh giá trị, trong khi === check kiểu dữ liệu rồi mới so sánh giá trị.\n\nMình xin khẳng định lại một lần nữa là KHÔNG PHẢI nhé. Mà phải là:\n\n== cho phép coercion (đổi kiểu dữ liệu).\n=== không cho phép coercion (đổi kiểu dữ liệu).\nNói có sách mách có chứng\n\nMình đã đọc đi đọc lại vài lượt specification của JavaScript rồi nên mình mạnh mồm lắm.\n\nOK, giờ bạn hãy nhìn vào mục 1 của specification về ==.\n\nAbstract Equality Comparison\n\nIf Type(x) is the same as Type(y), then Return the result of performing Strict Equality Comparison x === y.\nTạm dịch là Nếu hai thằng x và y có cùng type thì chuyển sang so sánh “===”. Còn lại thì xuống mục 2 check tiếp.\n\nƠ, nó cũng check type kìa anh em.\n\nNhìn tiếp vào mục 1 của specification về ===.\n\nStrict Equality Comparison\n\nIf Type(x) is different from Type(y), return false.\nTạm dịch là Nếu hai thằng x và y khác type thì trả về false. Còn lại thì xuống mục 2 check tiếp.\n\nOooh, vậy là cả hai thằng này đều check type hết chỉ có behaviors (hành vi) của chúng nó khác nhau sau khi check type thôi.\n\nTránh == nhiều nhất có thể?\nThứ nhất, đầy là một nhận định sai lầm lại do lười đọc specification của JavaScript. Như hướng dẫn của specification thì nếu x và y có cùng kiểu dữ liệu thì dù là == hay === đều như nhau hết.\n\nThứ hai, tại sao lại phải dùng === (có thể tốn thời gian thêm bước type conversion) mà không dùng luôn == với những thứ bạn đã biết rõ kiểu dữ liệu?\n\nThứ ba, việc dùng bừa bãi == và === chứng tỏ bạn không hiểu mình đang code cái gì. Bằng chứng là bạn đâu có nắm rõ được kiểu dữ liệu của biến trong chương trình.\n\nSau đây là quy tắc dùng == và ===:\n\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh.\n// Ví dụ 1\nvar x = {};\n\nif (x === null && x === undefined) {\n  // Do something ...\n}\n// Ví dụ 2\nvar x = {};\n\nif (x == null) {\n  // Do something ...\n}\n\n/**\n * Với `==`, null == underfined và ngược lại.\n * Cho nên, nếu giá trị của x bằng null hoặc undefined\n * thì việc so sánh là như nhau,\n * chương trình trông sáng sủa hơn.\n */\nCác trường hợp còn lại dùng ===\nJavaScript lạ chưa! @_@\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself)\n[] == ![]; // true ??? - so sánh với giá trị phụ định\n[] != []; // true\nvar codersX1 = [];\nvar codersX2 = [];\n\nif (codersX1 == !codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == !codersX2)\n * if ([] == ![]) => Thực hiện biến đổi ![] thành `false`\n * if ([] == false) => Thực hiện biến đổi [] thành ""\n * if ("" == false) => Thực hiện biến đổi "" thành 0 và `false` thành 0\n * if (0 === 0) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n * if (true) => giá trị bằng nhau nên trả về `true`\n */\n\nif (codersX1 != codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 != codersX2)\n * if (!(codersX1 == codersX2)) => `codersX1 == codersX2` trả về `false`\n * if (!(false))\n * if (true)\n */\nTổng kết\nCác kiểu dữ liệu trong JavaScript bao gồm Primitive Types (number, string, boolean, null, undefined, symbol, bigInt) và Non-Primitive Types (object).\nArray và Function được coi là subtype của Object (nhóm con).\n== cho phép coercion (đổi kiểu dữ liệu) trong khi === không cho phép coercion (đổi kiểu dữ liệu).\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh. Các trường hợp còn lại dùng ===\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself).\nBài tập cho bạn\nYêu cầu: Đọc đề bài ở file README. Sau đó, mở file index.js làm bài. Cuối cùng, xem đáp án ở file index.fixed.js. Có phần test ở cuối bài.\n\nEm Linh đây: https://repl.it/@Nhat_AnhAnh/CoercionExercises\n\nNếu tất cả là true thì là đúng hết. Làm được bài này các bạn sẽ học được rất nhiều thứ nên nếu ngồi cả ngày mà làm chưa đúng hết thì cứ làm tiếp nhé.\n\nTài liệu tham khảo\nKhóa Deep JS Foundations V3 của Kyle Simpson\nTập 4 Types and Grammar - You don’t know JS của Kyle Simpson\nAbstract Equality Comparison: ECMA-262, 9th edition, June 2018\nStrict Equality Comparison: ECMA-262, 9th edition, June 2018\nType conversion: ECMA-262, 9th edition, June 2018\nMDN documentation về Data Types\nNếu bạn có phần nào chưa rõ hay muốn trao đổi thêm với mình, đừng ngần ngại inbox mình nhé. Chúc các bạn đọc vui.\n\nNếu bạn muốn có nhiều cơ hội trải nghiệm hơn, hãy tham gia cộng đồng học lập trình miễn phí CodersX với chúng mình. Together, we change the world.',
          type: "blog",
          cover: {
            _id: "5e9ab00f0591fb40fc87faa3",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587195917/Coders-Tokyo-Forum/posts/javascript.png.png",
            publicId: "Coders-Tokyo-Forum/posts/javascript.png",
            fileName: "javascript.png",
            sizeBytes: 316358,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9ab00f0591fb40fc87faa2",
            resourceType: "image",
            createdAt: "2020-04-18T07:45:19.838Z",
            updatedAt: "2020-04-18T07:45:19.838Z",
            __v: 0
          },
          createdAt: "2020-04-18T07:45:19.846Z",
          updatedAt: "2020-04-18T07:45:19.846Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e9ab00f059fb40fc87faa2",
          tags: [
            {
              _id: "5e8ddf319ac8ee2dd68b1cd7",
              tagName: "coercion"
            },
            {
              _id: "5e8cb5562ded8236f29fc885",
              tagName: "nhatanh"
            }
          ],
          comments: [],
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde3229879524",
            username: "nhat_anh"
          },
          topic: "Bạn chưa hiểu JavaScript đâu kỳ 2 - Coercion",
          description:
            "Search Google với từ khóa coercion trong javascript rồi dạo một lượt tầm hơn chục bài tiếng việt nằm trên top mà mình tá hoảng khi chỉ có duy nhất 2 bài là nội dung tạm được và có trích dẫn nguồn. Còn lại đều mắc rất nhiều lỗi về cả nội dung lẫn dịch thuật. Vì vậy, để giúp các bạn có cái nhìn chính xác từ gốc tới ngọn, thay vì tung bài về this theo kế hoạch, mình đã quyết định viết thêm bài về Coercion. Và chắc bạn cũng đoán được chủ đề của Series Bạn chưa hiểu JavaScript đâu kỳ này là gì rồi nhỉ? Một, hai, ba, tẩy não thôi.",
          content:
            'Search Google với từ khóa coercion trong javascript rồi dạo một lượt tầm hơn chục bài tiếng việt nằm trên top mà mình tá hoảng khi chỉ có duy nhất 2 bài là nội dung tạm được và có trích dẫn nguồn. Còn lại đều mắc rất nhiều lỗi về cả nội dung lẫn dịch thuật. Vì vậy, để giúp các bạn có cái nhìn chính xác từ gốc tới ngọn, thay vì tung bài về this theo kế hoạch, mình đã quyết định viết thêm bài về Coercion. Và chắc bạn cũng đoán được chủ đề của Series Bạn chưa hiểu JavaScript đâu kỳ này là gì rồi nhỉ? Một, hai, ba, tẩy não thôi.\n\nNếu bạn chưa đọc bài Bạn chưa hiểu JavaScript đâu kỳ 1 - Scopes và Hoisting viết về bộ ba quyền lực trong JavaScript thì mình khuyên các bạn nên đọc nó trước tại đây.\n\nNhắc lại về kiểu dữ liệu trong JavaScript\nPrimitive Data Types\nKiểu dữ liệu được gọi là Primitive là kiểu dữ liệu không phải object và không có methods. Có 7 primitive types bao gồm:\n\nNumber\nString\nBoolean\nNull\nUndefined\nSymbol\nBigInt: một built-in object được tạo để biểu diễn whole numbers (số nguyên dương và số 0) có giá trị lớn hơn 2^53.\nBạn có thể đọc thêm về primitive types ở MDN documentation.\n\nNon-primitive Data Types\nĐọc tên thì cũng biết là đây là tập hợp kiểu dữ liệu nằm ngoài 7 kiểu ở trên.\n\nObject\nLưu ý: Array và Function được coi là subtype của Object (nhóm con), chứ nó không được coi như type của JavaScript. (Thắc mắc thì coi lại MDN documentation.)\n\nCoercion là gì?\nCoercion dịch từ anh ra việt nghĩa là sự ép buộc, bắt buộc làm gì đó.\n\nCoercion meaning\n\nTrong JavaScript, coercion (hay còn gọi là type conversion) được hiểu là việc biến đổi (convert) từ kiểu dữ liệu này sang kiểu dữ liệu khác trong quá trình thực hiện chương trình.\n\nTrong ví dụ dưới, ở vế trước, string “10” được đổi kiểu dữ liệu từ string thành number, rồi JavaScript Engine mới thực hiện so sánh giá trị hai vế với nhau.\n\n"10" == 10; // true => String bằng được Number. Lạ nhỉ???\nLưu ý, trong quá trình dịch, mình dùng từ đổi kiểu dữ liệu thay vì từ ép kiểu dữ liệu như số đông. Chỉ là thay đổi ngôn từ để các bạn dễ hiểu thay vì dịch kiểu Google translate và lạm dùng từ hán việt hại não các bạn.\n\nCoercion hoạt động như thế nào?\nĐây là thứ tự chạy của Engine trong == (cho phép coercion):\n\nĐổi sang Primitive Form nếu không phải Primitive Type.\nCheck xem cùng kiểu dữ liệu chưa? Nếu chưa, Engine thì sẽ ưu tiên đổi 2 vế thành Number (nếu có thể). Nếu rồi, nhảy qua bước 3.\nSo sánh giá trị.\nTrả về kết quả bằng true hoặc false.\nXét đoạn chương trình sau:\n\nvar codersX1 = 10;\nvar codersX2 = [10];\n\nif (codersX1 == codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == codersX2)\n\n * if (10 == [10]) => thực hiện ToPrimitive([10]), biến [10] thành "10"\n\n * if (10 == "10") => Vế trái có type là Number, nên vế phải sẽ được ưu tiên đổi sang Number, \n * "10" biến thành 10\n\n * if (10 === 10) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n\n * if (true) => giá trị bằng nhau nên trả về true\n */\nNhầm lẫn giữa == và ===\nMình xin phép giải thích thuật ngữ trước khi phân tích tiếp.\n\nThe ECMAScript specification (gọi tắt là ECMAScript hay ngắn gọn hơn nữa là specification - đây cũng là từ mình dùng trong bài này) là bộ tiêu chuẩn chung, hiểu đại khái như pháp luật của nước JavaScript, buộc mọi công dân trong lãnh thổ JavaScript phải tuân theo, phá luật, gặp bugs là tèo.\n\nCheck type và không check type?\nNhiều người vì không hiểu bản chất của JavaScript (có thể do lười đọc specification) mà nhầm rằng sự khác nhau giữa == và === là:\n\n== không check kiểu dữ liệu, chỉ so sánh giá trị, trong khi === check kiểu dữ liệu rồi mới so sánh giá trị.\n\nMình xin khẳng định lại một lần nữa là KHÔNG PHẢI nhé. Mà phải là:\n\n== cho phép coercion (đổi kiểu dữ liệu).\n=== không cho phép coercion (đổi kiểu dữ liệu).\nNói có sách mách có chứng\n\nMình đã đọc đi đọc lại vài lượt specification của JavaScript rồi nên mình mạnh mồm lắm.\n\nOK, giờ bạn hãy nhìn vào mục 1 của specification về ==.\n\nAbstract Equality Comparison\n\nIf Type(x) is the same as Type(y), then Return the result of performing Strict Equality Comparison x === y.\nTạm dịch là Nếu hai thằng x và y có cùng type thì chuyển sang so sánh “===”. Còn lại thì xuống mục 2 check tiếp.\n\nƠ, nó cũng check type kìa anh em.\n\nNhìn tiếp vào mục 1 của specification về ===.\n\nStrict Equality Comparison\n\nIf Type(x) is different from Type(y), return false.\nTạm dịch là Nếu hai thằng x và y khác type thì trả về false. Còn lại thì xuống mục 2 check tiếp.\n\nOooh, vậy là cả hai thằng này đều check type hết chỉ có behaviors (hành vi) của chúng nó khác nhau sau khi check type thôi.\n\nTránh == nhiều nhất có thể?\nThứ nhất, đầy là một nhận định sai lầm lại do lười đọc specification của JavaScript. Như hướng dẫn của specification thì nếu x và y có cùng kiểu dữ liệu thì dù là == hay === đều như nhau hết.\n\nThứ hai, tại sao lại phải dùng === (có thể tốn thời gian thêm bước type conversion) mà không dùng luôn == với những thứ bạn đã biết rõ kiểu dữ liệu?\n\nThứ ba, việc dùng bừa bãi == và === chứng tỏ bạn không hiểu mình đang code cái gì. Bằng chứng là bạn đâu có nắm rõ được kiểu dữ liệu của biến trong chương trình.\n\nSau đây là quy tắc dùng == và ===:\n\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh.\n// Ví dụ 1\nvar x = {};\n\nif (x === null && x === undefined) {\n  // Do something ...\n}\n// Ví dụ 2\nvar x = {};\n\nif (x == null) {\n  // Do something ...\n}\n\n/**\n * Với `==`, null == underfined và ngược lại.\n * Cho nên, nếu giá trị của x bằng null hoặc undefined\n * thì việc so sánh là như nhau,\n * chương trình trông sáng sủa hơn.\n */\nCác trường hợp còn lại dùng ===\nJavaScript lạ chưa! @_@\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself)\n[] == ![]; // true ??? - so sánh với giá trị phụ định\n[] != []; // true\nvar codersX1 = [];\nvar codersX2 = [];\n\nif (codersX1 == !codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == !codersX2)\n * if ([] == ![]) => Thực hiện biến đổi ![] thành `false`\n * if ([] == false) => Thực hiện biến đổi [] thành ""\n * if ("" == false) => Thực hiện biến đổi "" thành 0 và `false` thành 0\n * if (0 === 0) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n * if (true) => giá trị bằng nhau nên trả về `true`\n */\n\nif (codersX1 != codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 != codersX2)\n * if (!(codersX1 == codersX2)) => `codersX1 == codersX2` trả về `false`\n * if (!(false))\n * if (true)\n */\nTổng kết\nCác kiểu dữ liệu trong JavaScript bao gồm Primitive Types (number, string, boolean, null, undefined, symbol, bigInt) và Non-Primitive Types (object).\nArray và Function được coi là subtype của Object (nhóm con).\n== cho phép coercion (đổi kiểu dữ liệu) trong khi === không cho phép coercion (đổi kiểu dữ liệu).\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh. Các trường hợp còn lại dùng ===\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself).\nBài tập cho bạn\nYêu cầu: Đọc đề bài ở file README. Sau đó, mở file index.js làm bài. Cuối cùng, xem đáp án ở file index.fixed.js. Có phần test ở cuối bài.\n\nEm Linh đây: https://repl.it/@Nhat_AnhAnh/CoercionExercises\n\nNếu tất cả là true thì là đúng hết. Làm được bài này các bạn sẽ học được rất nhiều thứ nên nếu ngồi cả ngày mà làm chưa đúng hết thì cứ làm tiếp nhé.\n\nTài liệu tham khảo\nKhóa Deep JS Foundations V3 của Kyle Simpson\nTập 4 Types and Grammar - You don’t know JS của Kyle Simpson\nAbstract Equality Comparison: ECMA-262, 9th edition, June 2018\nStrict Equality Comparison: ECMA-262, 9th edition, June 2018\nType conversion: ECMA-262, 9th edition, June 2018\nMDN documentation về Data Types\nNếu bạn có phần nào chưa rõ hay muốn trao đổi thêm với mình, đừng ngần ngại inbox mình nhé. Chúc các bạn đọc vui.\n\nNếu bạn muốn có nhiều cơ hội trải nghiệm hơn, hãy tham gia cộng đồng học lập trình miễn phí CodersX với chúng mình. Together, we change the world.',
          type: "blog",
          cover: {
            _id: "5e9ab00f0591fb40fc87faa3",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587195917/Coders-Tokyo-Forum/posts/javascript.png.png",
            publicId: "Coders-Tokyo-Forum/posts/javascript.png",
            fileName: "javascript.png",
            sizeBytes: 316358,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9ab00f0591fb40fc87faa2",
            resourceType: "image",
            createdAt: "2020-04-18T07:45:19.838Z",
            updatedAt: "2020-04-18T07:45:19.838Z",
            __v: 0
          },
          createdAt: "2020-04-18T07:45:19.846Z",
          updatedAt: "2020-04-18T07:45:19.846Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        }
      ],
      topBloggers: {
        title: "Top Bloggers",
        type: 1,
        data: [
          {
            _id: "1",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587030274/Draw-io-trophies/--02-128_kotkpp.png",
            text: "chau_chau"
          },
          {
            _id: "2",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587030285/Draw-io-trophies/advantage_quality-128_hxdkdz.png",
            text: "nhat_anh"
          },
          {
            _id: "3",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587030256/Draw-io-trophies/movie-10-128_yf3ng3.png",
            text: "thanh_ton"
          }
        ]
      },
      tags: {
        title: "Tags",
        type: 2,
        data: [
          {
            _id: "1",
            text: "javascript",
            counter: 153
          },
          {
            _id: "2",
            text: "discussion",
            counter: 153
          },
          {
            _id: "3",
            text: "nodejs",
            counter: 153
          },
          {
            _id: "4",
            text: "html",
            counter: 153
          }
        ]
      },
      mostViewBlogs: {
        title: "Most Views",
        type: 2,
        data: [
          {
            _id: "1",
            text: "Javascript the best parts",
            counter: 153
          },
          {
            _id: "2",
            text: "Top 5 nodejs frameworks",
            counter: 100
          },
          {
            _id: "3",
            text: "HTML for dummies",
            counter: 99
          },
          {
            _id: "4",
            text: "Testing issues",
            counter: 80
          },
          {
            _id: "5",
            text: "Setting Mongo local",
            counter: 79
          },
          {
            _id: "6",
            text: "Javascript the best parts",
            counter: 153
          },
          {
            _id: "7",
            text: "Top 5 nodejs frameworks",
            counter: 100
          },
          {
            _id: "8",
            text: "HTML for dummies",
            counter: 99
          },
          {
            _id: "9",
            text: "Testing issues",
            counter: 80
          },
          {
            _id: "10",
            text: "Setting Mongo local",
            counter: 79
          }
        ]
      },
      membersOnline: {
        title: "Members Online",
        type: 1,
        data: [
          {
            _id: "1",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1586965772/Draw-io-avatars/12_avatar-128_hvhfyk.png",
            text: "ngo_minh"
          },
          {
            _id: "2",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1586965680/Draw-io-avatars/4_avatar-128_rk2yxz.png",
            text: "nhat_anh"
          },
          {
            _id: "3",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1586965594/Draw-io-avatars/avatar-128_s94fqh.png",
            text: "thanh_ton"
          }
        ]
      },
      showTopBloggers: true,
      showTags: true,
      showMostViewBlogs: true,
      showMembersOnline: true,
      sideBarStyle: {
        paddingTop: "12px"
      }
    };
  },
  created() {
    if (this.$route.path === "/stream/blogs") {
      this.showTitlePage = true;
      this.showViewMoreBtn = false
      this.sideBarStyle.paddingTop = "78px";
      this.showTopBloggers = false;
    }

    if (this.$route.path === "/stream") {
      this.mostViewBlogs.title = "Top 5 Discussions";
      let sliceMostViews = this.mostViewBlogs.data.slice(5);
      this.mostViewBlogs.data = sliceMostViews;
    }
  }
};
</script>

<style>
</style>